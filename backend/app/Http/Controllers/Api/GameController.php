<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\GameParticipant;
use App\Models\Question;
use App\Models\User;
use App\Models\UserAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GameController extends Controller
{
    /**
     * Create a new game room (1v1 or solo for now)
     */
    public function create(Request $request)
    {
        $request->validate([
            'stake_amount' => 'required|numeric|min:0',
            'category' => 'string|nullable',
            'difficulty' => 'in:easy,medium,hard',
            'game_type' => 'in:1v1,free',
        ]);

        $user = $request->user();

        // For now, create a waiting game
        $game = Game::create([
            'game_code' => Str::upper(Str::random(6)),
            'game_type' => $request->input('game_type', '1v1'),
            'stake_amount' => $request->input('stake_amount'),
            'category' => $request->input('category', 'general'),
            'difficulty' => $request->input('difficulty', 'medium'),
            'status' => 'waiting',
            'created_at' => now(),
        ]);

        // Add creator as participant
        GameParticipant::create([
            'game_id' => $game->id,
            'user_id' => $user->id,
            'joined_at' => now(),
        ]);

        return response()->json([
            'message' => 'Game created',
            'game' => $game,
        ]);
    }

    /**
     * Join an existing game by code or find available match
     */
    public function join(Request $request)
    {
        $user = $request->user();
        $gameCode = $request->input('game_code');

        if ($gameCode) {
            $game = Game::where('game_code', $gameCode)
                        ->where('status', 'waiting')
                        ->first();
            
            if (!$game) {
                return response()->json(['error' => 'Game not found or unable to join'], 404);
            }
        } else {
             // Find a random waiting game (Simple Matchmaking)
             // Match by stake amount if provided, otherwise any
             $stake = $request->input('stake_amount');

             $query = Game::where('status', 'waiting')
                        ->whereDoesntHave('participants', function($q) use ($user) {
                            $q->where('user_id', $user->id);
                        });

             if ($stake !== null) {
                 $query->where('stake_amount', $stake);
             }

             $game = $query->first();

             if (!$game) {
                 return response()->json(['message' => 'No games available. Create one!'], 404);
             }
        }

        // Add participant
        GameParticipant::create([
            'game_id' => $game->id,
            'user_id' => $user->id,
            'joined_at' => now(),
        ]);

        // Check if game is full (for 1v1, 2 players)
        // In this logic, we assume 1v1 triggers start
        if ($game->game_type === '1v1' && $game->participants()->count() >= 2) {
             $this->startGame($game);
        }

        return response()->json([
            'message' => 'Joined game',
            'game' => $game->fresh(),
        ]);
    }

    /**
     * Initialize game questions and set status to active
     */
    private function startGame(Game $game)
    {
        // 1. Select 10 random questions based on category/difficulty
        $questions = Question::inRandomOrder()
            // ->where('category', $game->category) // Filter later when seeded
            // ->where('difficulty', $game->difficulty)
            ->limit(10)
            ->get();
        
        if ($questions->count() < 10) {
             // Fallback if not enough questions
             $questions = Question::inRandomOrder()->limit(10)->get();
        }

        // 2. Attach to game
        foreach ($questions as $index => $q) {
            DB::table('game_questions')->insert([
                'game_id' => $game->id,
                'question_id' => $q->id,
                'question_order' => $index + 1,
                'time_limit' => 15,
            ]);
        }

        // 3. Update status
        $game->update([
            'status' => 'in_progress',
            'started_at' => now(),
        ]);
    }

    /**
     * Get game state and current question
     */
    public function status(Request $request, $id) 
    {
        $game = Game::with(['participants.user'])->findOrFail($id);
        
        // If in progress, return questions (without answers if possible, but for simplicity sending all)
        // In a real secure app, answers should be hidden or checked purely on backend submit.
        $questions = [];
        if ($game->status === 'in_progress') {
             $questions = $game->questions()
                ->get()
                ->map(function($q) {
                    return [
                        'id' => $q->id,
                        'text' => $q->text,
                        'options' => $q->options,
                        'time_limit' => $q->pivot->time_limit,
                        'order' => $q->pivot->order,
                    ];
                });
        }

        return response()->json([
            'game' => $game,
            'questions' => $questions
        ]);
    }

    /**
     * Submit an answer
     */
    public function submitAnswer(Request $request, $id)
    {
        $request->validate([
            'question_id' => 'required|exists:questions,id',
            'answer' => 'required',
            'time_taken' => 'required|numeric',
        ]);

        $user = $request->user();
        $game = Game::findOrFail($id);
        
        if ($game->status !== 'in_progress') {
            return response()->json(['error' => 'Game is not in progress'], 400);
        }

        $question = Question::find($request->question_id);
        $isCorrect = $question->correct_answer === $request->answer;
        
        // Calculate points
        $points = 0;
        if ($isCorrect) {
            $points = 1000; // Base points
            // Bonus for speed (max 500)
            $timeBonus = max(0, (15 - $request->time_taken) * 33);
            $points += $timeBonus;
        }

        // Record Answer
        UserAnswer::create([
            'game_id' => $game->id,
            'user_id' => $user->id,
            'question_id' => $question->id,
            'answer_given' => $request->answer,
            'is_correct' => $isCorrect,
            'response_time' => $request->time_taken,
            'points_earned' => $points, // Add column to migration if missing, or calculate dynamically
            'answered_at' => now(),
        ]);
        
        // Update Participant Score
        $participant = GameParticipant::where('game_id', $game->id)
                        ->where('user_id', $user->id)
                        ->first();
        
        if ($participant) {
            $participant->score += $points;
            if ($isCorrect) $participant->correct_answers += 1;
            $participant->save();
        }

        // Check if Game Over (if this user answered all questions)
        // This logic is simplified; simplified turn-based or sync needed for real-time multiplayer.
        // For MVP, client checks if 10 questions answered.
        $answersCount = UserAnswer::where('game_id', $game->id)
                            ->where('user_id', $user->id)
                            ->count();
        
        if ($answersCount >= 10) {
             $participant->finished_at = now();
             $participant->save();
             
             // If all participants finished, end game
             $activeParticipants = $game->participants()->whereNull('finished_at')->count();
             if ($activeParticipants === 0) {
                 $this->endGame($game);
             }
        }

        return response()->json([
            'correct' => $isCorrect,
            'points' => $points,
            'total_score' => $participant->score
        ]);
    }

    private function endGame(Game $game)
    {
        // Determine winner
        $winner = $game->participants()->orderByDesc('score')->first();
        
        // Update Game
        $game->update([
            'status' => 'completed',
            'ended_at' => now(),
            'winner_id' => $winner ? $winner->user_id : null,
        ]);
        
        // Distribute rewards logic would be called here (Interaction with Blockchain listener or flagging for payout)
    }
}
