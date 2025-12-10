    # PROMPT TÉCNICO PARA CLAUDE CODE - TRIVIA STREAK WARS

## CONTEXTO DEL PROYECTO

Estás ayudando a desarrollar **Trivia Streak Wars**, una Mini App para World App donde usuarios compiten en batallas de trivia apostando USDC. Es un juego skill-based donde el conocimiento determina al ganador, con un sistema de rachas adictivo que multiplica ganancias.

**Desarrollador**: Backend PHP/Laravel developer con experiencia en Linux servers  
**Objetivo Inmediato**: Crear MVP funcional en 4-6 semanas  
**Prioridad**: Backend Laravel robusto + Frontend Next.js mínimo funcional + Smart Contracts básicos

---

## STACK TECNOLÓGICO DEFINITIVO

### Backend
- **Framework**: Laravel 11.x (PHP 8.3)
- **Database**: MySQL 8.0
- **Cache/Queue**: Redis 7.x
- **WebSockets**: Laravel Reverb
- **Auth**: Laravel Sanctum + World ID verification
- **Testing**: Pest PHP

### Frontend
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **State**: Zustand
- **Web3**: @worldcoin/minikit-js
- **HTTP**: Axios
- **WebSockets**: Socket.io-client

### Blockchain
- **Network**: World Chain Testnet (Sepolia)
- **Contracts**: Solidity 0.8.24
- **Dev Tools**: Foundry (forge, cast, anvil)
- **Testing**: Forge test
- **Deployment**: Foundry scripts

### DevOps
- **Server**: Ubuntu 24.04 LTS
- **Web Server**: Nginx
- **Process Manager**: Supervisor (Laravel Queue)
- **SSL**: Let's Encrypt
- **Environment**: Docker Compose (desarrollo local)

---

## ESTRUCTURA DEL PROYECTO

```
trivia-streak-wars/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── GameController.php
│   │   │   │   ├── MatchmakingController.php
│   │   │   │   ├── QuestionController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── LeaderboardController.php
│   │   │   │   └── WebhookController.php
│   │   │   ├── Middleware/
│   │   │   │   ├── VerifyWorldId.php
│   │   │   │   └── RateLimitGames.php
│   │   │   └── Requests/
│   │   │       ├── CreateGameRequest.php
│   │   │       └── SubmitAnswerRequest.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Game.php
│   │   │   ├── GameParticipant.php
│   │   │   ├── Question.php
│   │   │   ├── UserAnswer.php
│   │   │   ├── Streak.php
│   │   │   ├── Transaction.php
│   │   │   └── Leaderboard.php
│   │   ├── Services/
│   │   │   ├── GameService.php
│   │   │   ├── MatchmakingService.php
│   │   │   ├── QuestionService.php
│   │   │   ├── StreakService.php
│   │   │   ├── Web3Service.php
│   │   │   └── WorldIdService.php
│   │   ├── Jobs/
│   │   │   ├── ProcessGameResult.php
│   │   │   ├── DistributePrizes.php
│   │   │   └── UpdateLeaderboards.php
│   │   └── Events/
│   │       ├── GameStarted.php
│   │       ├── QuestionSent.php
│   │       ├── GameEnded.php
│   │       └── StreakUpdated.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │       └── QuestionSeeder.php
│   ├── routes/
│   │   ├── api.php
│   │   └── channels.php
│   ├── config/
│   │   ├── worldchain.php
│   │   └── game.php
│   ├── tests/
│   │   ├── Feature/
│   │   └── Unit/
│   ├── .env.example
│   ├── composer.json
│   └── README.md
│
├── frontend/                   # Next.js Mini App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Home
│   │   │   ├── game/[id]/page.tsx       # Game Screen
│   │   │   ├── matchmaking/page.tsx     # Finding Opponent
│   │   │   ├── results/page.tsx         # Game Results
│   │   │   ├── profile/page.tsx         # User Profile
│   │   │   ├── leaderboard/page.tsx     # Rankings
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                      # shadcn components
│   │   │   ├── GameQuestion.tsx
│   │   │   ├── GameTimer.tsx
│   │   │   ├── ScoreBoard.tsx
│   │   │   ├── StreakBadge.tsx
│   │   │   └── WalletConnect.tsx
│   │   ├── lib/
│   │   │   ├── api.ts                   # Axios instance
│   │   │   ├── worldchain.ts            # Web3 utils
│   │   │   └── socket.ts                # WebSocket client
│   │   ├── stores/
│   │   │   ├── useGameStore.ts
│   │   │   ├── useUserStore.ts
│   │   │   └── useWalletStore.ts
│   │   ├── types/
│   │   │   ├── game.ts
│   │   │   ├── user.ts
│   │   │   └── question.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       └── validators.ts
│   ├── public/
│   ├── .env.local.example
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── contracts/                  # Smart Contracts
│   ├── src/
│   │   ├── StakePool.sol
│   │   ├── GameRegistry.sol
│   │   └── StreakRewards.sol
│   ├── test/
│   │   ├── StakePool.t.sol
│   │   └── GameRegistry.t.sol
│   ├── script/
│   │   ├── Deploy.s.sol
│   │   └── Interactions.s.sol
│   ├── foundry.toml
│   ├── .env.example
│   └── README.md
│
├── docker-compose.yml          # Local development
├── .gitignore
└── README.md                   # Main project README
```

---

## FASE 1: SETUP INICIAL (HACER PRIMERO)

### 1.1 Crear Estructura Base de Directorios

```bash
# Crear directorios principales
mkdir -p trivia-streak-wars/{backend,frontend,contracts}
cd trivia-streak-wars

# Inicializar Git
git init
git branch -M main
```

### 1.2 Setup Backend Laravel

```bash
cd backend

# Instalar Laravel 11
composer create-project laravel/laravel . "11.*"

# Instalar dependencias adicionales
composer require laravel/sanctum
composer require laravel/reverb
composer require web3p/web3.php
composer require predis/predis
composer require --dev pestphp/pest
composer require --dev pestphp/pest-plugin-laravel

# Configurar Pest
php artisan pest:install

# Publicar configs
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan vendor:publish --provider="Laravel\Reverb\ReverbServiceProvider"
```

### 1.3 Setup Frontend Next.js

```bash
cd ../frontend

# Crear proyecto Next.js con TypeScript
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Instalar dependencias
npm install @worldcoin/minikit-js
npm install zustand
npm install axios
npm install socket.io-client
npm install framer-motion
npm install date-fns

# Instalar shadcn/ui
npx shadcn-ui@latest init

# Agregar componentes shadcn que vamos a usar
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

### 1.4 Setup Smart Contracts (Foundry)

```bash
cd ../contracts

# Instalar Foundry (si no está instalado)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Inicializar proyecto Foundry
forge init --no-git

# Instalar OpenZeppelin
forge install OpenZeppelin/openzeppelin-contracts
```

### 1.5 Crear Docker Compose para Desarrollo Local

Crear archivo `docker-compose.yml` en la raíz:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: trivia_mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: trivia_db
      MYSQL_USER: trivia_user
      MYSQL_PASSWORD: secret
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    container_name: trivia_redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  mailhog:
    image: mailhog/mailhog
    container_name: trivia_mailhog
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI

volumes:
  mysql_data:
  redis_data:
```

Iniciar servicios:
```bash
docker-compose up -d
```

---

## FASE 2: BACKEND LARAVEL - CONFIGURACIÓN INICIAL

### 2.1 Configurar .env

```bash
cd backend
cp .env.example .env
```

Editar `.env`:
```env
APP_NAME="Trivia Streak Wars"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trivia_db
DB_USERNAME=trivia_user
DB_PASSWORD=secret

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

REVERB_APP_ID=trivia-app
REVERB_APP_KEY=trivia-key
REVERB_APP_SECRET=trivia-secret
REVERB_HOST="localhost"
REVERB_PORT=8080
REVERB_SCHEME=http

# World Chain (Sepolia Testnet)
WORLD_CHAIN_RPC_URL=https://worldchain-sepolia.g.alchemy.com/v2/YOUR_KEY
WORLD_CHAIN_CHAIN_ID=4801

# Smart Contracts (Deploy después)
STAKE_POOL_CONTRACT=
GAME_REGISTRY_CONTRACT=
STREAK_REWARDS_CONTRACT=

# World App
WORLD_APP_ID=app_your_app_id
WORLD_API_KEY=your_api_key

# Game Settings
GAME_QUESTIONS_PER_ROUND=10
GAME_TIME_PER_QUESTION=15
GAME_MIN_STAKE=0.50
GAME_MAX_STAKE=20.00
PLATFORM_FEE_PERCENT=10
```

### 2.2 Generar App Key y Migrar

```bash
php artisan key:generate
php artisan migrate
```

---

## FASE 3: CREAR MIGRACIONES DE BASE DE DATOS

### 3.1 Crear Migraciones

```bash
cd backend

# Crear todas las migraciones necesarias
php artisan make:migration create_users_table
php artisan make:migration create_games_table
php artisan make:migration create_game_participants_table
php artisan make:migration create_questions_table
php artisan make:migration create_game_questions_table
php artisan make:migration create_user_answers_table
php artisan make:migration create_streaks_table
php artisan make:migration create_transactions_table
php artisan make:migration create_leaderboards_table
```

### 3.2 Implementar Migration: users

**Archivo**: `database/migrations/XXXX_XX_XX_create_users_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('wallet_address', 42)->unique();
            $table->string('world_id')->unique();
            $table->string('username', 50)->unique()->nullable();
            $table->string('avatar_url')->nullable();
            $table->integer('total_games')->default(0);
            $table->integer('total_wins')->default(0);
            $table->decimal('total_earned', 20, 8)->default(0);
            $table->integer('current_streak')->default(0);
            $table->integer('max_streak')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_banned')->default(false);
            $table->timestamps();
            
            $table->index('wallet_address');
            $table->index('world_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

### 3.3 Implementar Migration: games

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('game_code', 10)->unique();
            $table->enum('game_type', ['1v1', 'tournament', 'free'])->default('1v1');
            $table->decimal('stake_amount', 20, 8);
            $table->string('category', 50)->default('general');
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
            $table->enum('status', ['waiting', 'in_progress', 'completed', 'cancelled'])->default('waiting');
            $table->foreignId('winner_id')->nullable()->constrained('users');
            $table->decimal('pool_total', 20, 8)->default(0);
            $table->decimal('platform_fee', 20, 8)->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamps();
            
            $table->index('status');
            $table->index('game_type');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
```

### 3.4 Implementar Resto de Migrations

Seguir el mismo patrón para:
- `game_participants`
- `questions`
- `game_questions`
- `user_answers`
- `streaks`
- `transactions`
- `leaderboards`

(Ver estructura completa en especificaciones técnicas)

### 3.5 Ejecutar Migraciones

```bash
php artisan migrate
```

---

## FASE 4: CREAR MODELOS ELOQUENT

### 4.1 Generar Modelos

```bash
cd backend

php artisan make:model User
php artisan make:model Game
php artisan make:model GameParticipant
php artisan make:model Question
php artisan make:model UserAnswer
php artisan make:model Streak
php artisan make:model Transaction
php artisan make:model Leaderboard
```

### 4.2 Implementar Model: User

**Archivo**: `app/Models/User.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'wallet_address',
        'world_id',
        'username',
        'avatar_url',
        'is_verified',
    ];

    protected $hidden = [
        'world_id', // No exponer en API
    ];

    protected $casts = [
        'total_earned' => 'decimal:8',
        'is_verified' => 'boolean',
        'is_banned' => 'boolean',
    ];

    // Relationships
    public function games()
    {
        return $this->belongsToMany(Game::class, 'game_participants')
            ->withPivot(['score', 'rank', 'prize_amount'])
            ->withTimestamps();
    }

    public function streak()
    {
        return $this->hasOne(Streak::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function answers()
    {
        return $this->hasMany(UserAnswer::class);
    }

    // Helpers
    public function incrementStreak()
    {
        $this->increment('current_streak');
        
        if ($this->current_streak > $this->max_streak) {
            $this->update(['max_streak' => $this->current_streak]);
        }
    }

    public function resetStreak()
    {
        $this->update(['current_streak' => 0]);
    }

    public function calculateWinRate(): float
    {
        if ($this->total_games === 0) {
            return 0;
        }
        
        return round(($this->total_wins / $this->total_games) * 100, 2);
    }
}
```

### 4.3 Implementar Model: Game

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_code',
        'game_type',
        'stake_amount',
        'category',
        'difficulty',
        'status',
        'winner_id',
        'pool_total',
        'platform_fee',
        'started_at',
        'ended_at',
    ];

    protected $casts = [
        'stake_amount' => 'decimal:8',
        'pool_total' => 'decimal:8',
        'platform_fee' => 'decimal:8',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($game) {
            $game->game_code = $game->game_code ?? strtoupper(Str::random(6));
        });
    }

    // Relationships
    public function participants()
    {
        return $this->belongsToMany(User::class, 'game_participants')
            ->withPivot(['score', 'rank', 'prize_amount', 'correct_answers', 'avg_response_time'])
            ->withTimestamps();
    }

    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'game_questions')
            ->withPivot(['question_order', 'time_limit'])
            ->orderBy('game_questions.question_order');
    }

    // Helpers
    public function isFull(): bool
    {
        $maxParticipants = match($this->game_type) {
            '1v1' => 2,
            'tournament' => 16,
            'free' => 100,
            default => 2,
        };

        return $this->participants()->count() >= $maxParticipants;
    }

    public function canStart(): bool
    {
        return $this->status === 'waiting' && $this->isFull();
    }

    public function start()
    {
        $this->update([
            'status' => 'in_progress',
            'started_at' => now(),
        ]);
    }

    public function complete(User $winner)
    {
        $this->update([
            'status' => 'completed',
            'winner_id' => $winner->id,
            'ended_at' => now(),
        ]);
    }
}
```

### 4.4 Implementar Resto de Modelos

Continuar con los demás modelos siguiendo el patrón anterior.

---

## FASE 5: CREAR SERVICIOS PRINCIPALES

### 5.1 WorldIdService

**Archivo**: `app/Services/WorldIdService.php`

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class WorldIdService
{
    protected string $apiKey;
    protected string $appId;

    public function __construct()
    {
        $this->apiKey = config('services.world.api_key');
        $this->appId = config('services.world.app_id');
    }

    public function verifyProof(string $proof, string $merkleRoot, string $nullifierHash, string $action): bool
    {
        try {
            $response = Http::post('https://developer.worldcoin.org/api/v1/verify/' . $this->appId, [
                'proof' => $proof,
                'merkle_root' => $merkleRoot,
                'nullifier_hash' => $nullifierHash,
                'action' => $action,
                'signal' => '', // Optional
            ]);

            if ($response->successful()) {
                return $response->json('success') === true;
            }

            return false;
        } catch (Exception $e) {
            report($e);
            return false;
        }
    }

    public function sendNotification(array $walletAddresses, string $title, string $message, ?string $miniAppPath = null): bool
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post('https://developer.worldcoin.org/api/v2/minikit/send-notification', [
                'app_id' => $this->appId,
                'wallet_addresses' => $walletAddresses,
                'title' => $title,
                'message' => $message,
                'mini_app_path' => $miniAppPath,
            ]);

            return $response->successful();
        } catch (Exception $e) {
            report($e);
            return false;
        }
    }
}
```

### 5.2 GameService

**Archivo**: `app/Services/GameService.php`

```php
<?php

namespace App\Services;

use App\Models\Game;
use App\Models\User;
use App\Models\Question;
use App\Events\GameStarted;
use Illuminate\Support\Facades\DB;

class GameService
{
    public function __construct(
        protected QuestionService $questionService,
        protected Web3Service $web3Service
    ) {}

    public function createGame(array $data): Game
    {
        return DB::transaction(function () use ($data) {
            $game = Game::create([
                'game_type' => $data['game_type'] ?? '1v1',
                'stake_amount' => $data['stake_amount'],
                'category' => $data['category'] ?? 'general',
                'difficulty' => $data['difficulty'] ?? 'medium',
                'pool_total' => 0,
            ]);

            // Seleccionar preguntas para el juego
            $questions = $this->questionService->getRandomQuestions(
                category: $game->category,
                difficulty: $game->difficulty,
                count: config('game.questions_per_round', 10)
            );

            foreach ($questions as $index => $question) {
                $game->questions()->attach($question->id, [
                    'question_order' => $index + 1,
                    'time_limit' => config('game.time_per_question', 15),
                ]);
            }

            return $game->load('questions');
        });
    }

    public function joinGame(Game $game, User $user): void
    {
        if ($game->isFull()) {
            throw new \Exception('Game is full');
        }

        // Verificar stake depositado en smart contract
        // $this->web3Service->verifyDeposit($user, $game->stake_amount);

        $game->participants()->attach($user->id, [
            'joined_at' => now(),
        ]);

        $game->increment('pool_total', $game->stake_amount);

        if ($game->canStart()) {
            $this->startGame($game);
        }
    }

    protected function startGame(Game $game): void
    {
        $game->start();
        
        event(new GameStarted($game));
    }

    public function submitAnswer(Game $game, User $user, int $questionId, string $answer, float $responseTime): array
    {
        $question = Question::findOrFail($questionId);
        $isCorrect = $question->correct_answer === $answer;

        // Calcular puntos (corrección + bonus por velocidad)
        $points = 0;
        if ($isCorrect) {
            $basePoints = 100;
            $speedBonus = max(0, 50 - ($responseTime * 3)); // Bonus decrece con tiempo
            $points = $basePoints + $speedBonus;
        }

        // Guardar respuesta
        $userAnswer = $user->answers()->create([
            'game_id' => $game->id,
            'question_id' => $questionId,
            'answer_given' => $answer,
            'is_correct' => $isCorrect,
            'response_time' => $responseTime,
            'points_earned' => $points,
            'answered_at' => now(),
        ]);

        // Actualizar score del participante
        $game->participants()->updateExistingPivot($user->id, [
            'score' => DB::raw('score + ' . $points),
            'correct_answers' => DB::raw('correct_answers + ' . ($isCorrect ? 1 : 0)),
        ]);

        return [
            'is_correct' => $isCorrect,
            'points_earned' => $points,
            'correct_answer' => $question->correct_answer,
            'explanation' => $question->explanation,
        ];
    }

    public function completeGame(Game $game): void
    {
        // Determinar ganador
        $rankings = $game->participants()
            ->orderByPivot('score', 'desc')
            ->get();

        $winner = $rankings->first();
        
        // Actualizar ranking en pivot
        foreach ($rankings as $index => $participant) {
            $game->participants()->updateExistingPivot($participant->id, [
                'rank' => $index + 1,
            ]);
        }

        $game->complete($winner);

        // Calcular premios
        $this->distributePrizes($game, $winner);
    }

    protected function distributePrizes(Game $game, User $winner): void
    {
        $platformFeePercent = config('game.platform_fee_percent', 10);
        $platformFee = $game->pool_total * ($platformFeePercent / 100);
        $winnerPrize = $game->pool_total - $platformFee;

        // Aplicar multiplicador de streak
        $streakMultiplier = $this->calculateStreakMultiplier($winner);
        $winnerPrize *= $streakMultiplier;

        $game->update([
            'platform_fee' => $platformFee,
        ]);

        $game->participants()->updateExistingPivot($winner->id, [
            'prize_amount' => $winnerPrize,
        ]);

        // Transferir premios via smart contract
        // $this->web3Service->distributePrizes($game, $winner, $winnerPrize);

        // Actualizar stats del ganador
        $winner->increment('total_wins');
        $winner->increment('total_games');
        $winner->increment('total_earned', $winnerPrize);
        $winner->incrementStreak();

        // Actualizar stats del perdedor
        $losers = $game->participants()->where('users.id', '!=', $winner->id)->get();
        foreach ($losers as $loser) {
            $loser->increment('total_games');
            $loser->resetStreak();
        }
    }

    protected function calculateStreakMultiplier(User $user): float
    {
        return match(true) {
            $user->current_streak >= 50 => 3.0,
            $user->current_streak >= 20 => 2.0,
            $user->current_streak >= 10 => 1.5,
            $user->current_streak >= 5 => 1.25,
            $user->current_streak >= 3 => 1.1,
            default => 1.0,
        };
    }
}
```

### 5.3 MatchmakingService

**Archivo**: `app/Services/MatchmakingService.php`

```php
<?php

namespace App\Services;

use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Redis;

class MatchmakingService
{
    protected int $timeoutSeconds = 60;

    public function findMatch(User $user, float $stakeAmount, string $category = 'general'): ?Game
    {
        $key = "matchmaking:{$stakeAmount}:{$category}";

        // Buscar juego existente esperando jugador
        $game = Game::where('status', 'waiting')
            ->where('game_type', '1v1')
            ->where('stake_amount', $stakeAmount)
            ->where('category', $category)
            ->whereDoesntHave('participants', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->first();

        if ($game) {
            return $game;
        }

        // Si no hay juego, crear uno nuevo
        return Game::create([
            'game_type' => '1v1',
            'stake_amount' => $stakeAmount,
            'category' => $category,
            'difficulty' => 'medium',
        ]);
    }

    public function addToQueue(User $user, float $stakeAmount, string $category): void
    {
        $key = "queue:{$stakeAmount}:{$category}";
        Redis::zadd($key, time(), $user->id);
        Redis::expire($key, $this->timeoutSeconds);
    }

    public function removeFromQueue(User $user, float $stakeAmount, string $category): void
    {
        $key = "queue:{$stakeAmount}:{$category}";
        Redis::zrem($key, $user->id);
    }
}
```

---

## FASE 6: CREAR CONTROLLERS

### 6.1 GameController

**Archivo**: `app/Http/Controllers/GameController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Services\GameService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GameController extends Controller
{
    public function __construct(
        protected GameService $gameService
    ) {}

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'game_type' => 'required|in:1v1,tournament,free',
            'stake_amount' => 'required|numeric|min:0.5|max:20',
            'category' => 'nullable|string',
            'difficulty' => 'nullable|in:easy,medium,hard',
        ]);

        $game = $this->gameService->createGame($validated);

        return response()->json([
            'game' => $game,
        ], 201);
    }

    public function show(Game $game): JsonResponse
    {
        return response()->json([
            'game' => $game->load(['participants', 'questions']),
        ]);
    }

    public function join(Request $request, Game $game): JsonResponse
    {
        $user = $request->user();

        try {
            $this->gameService->joinGame($game, $user);

            return response()->json([
                'message' => 'Successfully joined game',
                'game' => $game->fresh(['participants']),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function submitAnswer(Request $request, Game $game): JsonResponse
    {
        $validated = $request->validate([
            'question_id' => 'required|exists:questions,id',
            'answer' => 'required|string',
            'response_time' => 'required|numeric|min:0',
        ]);

        $user = $request->user();

        $result = $this->gameService->submitAnswer(
            $game,
            $user,
            $validated['question_id'],
            $validated['answer'],
            $validated['response_time']
        );

        return response()->json($result);
    }
}
```

### 6.2 UserController

**Archivo**: `app/Http/Controllers/UserController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user()->load(['streak']);

        return response()->json([
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'wallet_address' => $user->wallet_address,
                'avatar_url' => $user->avatar_url,
                'total_games' => $user->total_games,
                'total_wins' => $user->total_wins,
                'total_earned' => $user->total_earned,
                'current_streak' => $user->current_streak,
                'max_streak' => $user->max_streak,
                'win_rate' => $user->calculateWinRate(),
            ],
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => 'nullable|string|max:50|unique:users,username,' . $request->user()->id,
            'avatar_url' => 'nullable|url',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $request->user(),
        ]);
    }

    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        $recentGames = $user->games()
            ->orderBy('games.created_at', 'desc')
            ->take(10)
            ->get();

        $categoryStats = $user->games()
            ->selectRaw('category, COUNT(*) as games_played, SUM(CASE WHEN winner_id = ? THEN 1 ELSE 0 END) as wins', [$user->id])
            ->groupBy('category')
            ->get();

        return response()->json([
            'recent_games' => $recentGames,
            'category_stats' => $categoryStats,
            'total_games' => $user->total_games,
            'total_wins' => $user->total_wins,
            'win_rate' => $user->calculateWinRate(),
        ]);
    }
}
```

---

## FASE 7: CONFIGURAR RUTAS API

**Archivo**: `backend/routes/api.php`

```php
<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MatchmakingController;
use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/world-id', [AuthController::class, 'worldId']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    // User
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/stats', [UserController::class, 'stats']);
    
    // Matchmaking
    Route::post('/matchmaking/quick', [MatchmakingController::class, 'quickMatch']);
    Route::post('/matchmaking/cancel', [MatchmakingController::class, 'cancel']);
    
    // Games
    Route::post('/games', [GameController::class, 'store']);
    Route::get('/games/{game}', [GameController::class, 'show']);
    Route::post('/games/{game}/join', [GameController::class, 'join']);
    Route::post('/games/{game}/answer', [GameController::class, 'submitAnswer']);
    
    // Leaderboards
    Route::get('/leaderboards/{period}', [LeaderboardController::class, 'index']);
});
```

---

## INSTRUCCIONES ESPECÍFICAS PARA CLAUDE CODE

### 1. PRIORIDAD DE DESARROLLO

**Orden de implementación:**

1. ✅ Setup inicial (directorios, dependencias)
2. ✅ Configuración .env y docker-compose
3. ✅ Migraciones de base de datos
4. ✅ Modelos Eloquent con relaciones
5. ✅ Servicios principales (WorldIdService, GameService, MatchmakingService)
6. ✅ Controllers básicos (UserController, GameController)
7. ✅ Rutas API
8. ⏭️ Seeder de preguntas (500 mínimo)
9. ⏭️ Frontend básico (Home, Matchmaking, Game screens)
10. ⏭️ Smart Contracts (StakePool, GameRegistry)
11. ⏭️ WebSocket para real-time game
12. ⏭️ Testing

### 2. COMANDOS PARA DESARROLLO

```bash
# Backend (Terminal 1)
cd backend
php artisan serve

# Queue Worker (Terminal 2)
cd backend
php artisan queue:work

# Reverb WebSocket (Terminal 3)
cd backend
php artisan reverb:start

# Frontend (Terminal 4)
cd frontend
npm run dev

# Anvil Local Blockchain (Terminal 5)
cd contracts
anvil
```

### 3. TESTING

```bash
# Backend tests
cd backend
php artisan test
# o
./vendor/bin/pest

# Frontend tests
cd frontend
npm test

# Smart Contracts tests
cd contracts
forge test -vvv
```

### 4. DEPLOYMENT CHECKLIST

- [ ] Variables de entorno en producción
- [ ] SSL/HTTPS configurado
- [ ] Base de datos backed up
- [ ] Smart contracts auditados
- [ ] Rate limiting activado
- [ ] Monitoring (Sentry) configurado
- [ ] CI/CD pipeline funcionando

---

## COMANDOS RÁPIDOS DE REFERENCIA

```bash
# Laravel
php artisan migrate:fresh --seed
php artisan optimize:clear
php artisan queue:restart
php artisan reverb:restart

# Next.js
npm run build
npm run start

# Foundry
forge build
forge test
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f
```

---

## NOTAS IMPORTANTES PARA EL DESARROLLO

1. **Siempre validar en backend**: Nunca confiar en datos del frontend
2. **Proteger contra cheating**: Time sync, validación server-side
3. **Rate limiting**: Especialmente en endpoints de matchmaking y submit answer
4. **Logs**: Usar Laravel Log facade para debugging
5. **Transactions DB**: Usar DB::transaction() para operaciones críticas
6. **Cache**: Usar Redis para leaderboards y matchmaking queues
7. **Error Handling**: Siempre try-catch en servicios críticos
8. **Testing**: Escribir tests para lógica core (GameService, StreakService)
9. **World ID**: Verificar en CADA acción importante (crear game, submit answer)
10. **Smart Contracts**: Testear exhaustivamente antes de deploy a mainnet

---

## SIGUIENTES PASOS INMEDIATOS

1. **Setup Backend**: Ejecutar todos los comandos de la Fase 1 y 2
2. **Crear Migraciones**: Implementar todas las tablas de base de datos
3. **Modelos**: Crear modelos con relaciones correctas
4. **Seeder de Preguntas**: Crear al menos 500 preguntas variadas
5. **Services**: Implementar GameService, MatchmakingService, WorldIdService
6. **Controllers**: Implementar UserController, GameController
7. **Testing Manual**: Probar endpoints con Postman/Insomnia

Una vez que el backend esté funcional, podemos pasar al frontend.

---

**ESTE ES TU PUNTO DE PARTIDA. EMPIEZA POR LA FASE 1 Y AVANZA SECUENCIALMENTE.**
