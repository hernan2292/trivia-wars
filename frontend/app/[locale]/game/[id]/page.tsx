'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gameService } from '@/services/api';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function GamePage() {
    const params = useParams();
    const router = useRouter();
    const gameId = Number(params.id);
    const [game, setGame] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [gameState, setGameState] = useState<'loading' | 'waiting' | 'playing' | 'results'>('loading');
    
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initial Load
    useEffect(() => {
        if (!gameId) return;
        const fetchGame = async () => {
            try {
                const data = await gameService.getGameStatus(gameId);
                setGame(data.game);
                if (data.game.status === 'in_progress') {
                    setFunctions(data.questions);
                    setGameState('playing');
                } else if (data.game.status === 'waiting') {
                    setGameState('waiting');
                } else if (data.game.status === 'completed') {
                    setGameState('results');
                }
            } catch (error) {
                console.error("Failed to load game", error);
            }
        };

        fetchGame();
        const interval = setInterval(fetchGame, 3000); // Polling for status changes
        return () => clearInterval(interval);
    }, [gameId]);

    const setFunctions = (qs: any[]) => {
         // Sort by order
         const sorted = qs.sort((a,b) => a.order - b.order);
         setQuestions(sorted);
    };

    // Timer Logic for Question
    useEffect(() => {
        if (gameState !== 'playing' || showFeedback) return;
        
        setTimeLeft(15); // Reset
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentQIndex, gameState, showFeedback]);

    const handleTimeOut = () => {
        submitAnswer(null, 15);
    };

    const submitAnswer = async (answer: string | null, timeTaken: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        
        const currentQ = questions[currentQIndex];
        if (!currentQ) return; 

        try {
            // Optimistic UI could be added here
            const result = await gameService.submitAnswer(gameId, currentQ.id, answer || '', timeTaken);
            
            setShowFeedback(result.correct ? 'correct' : 'wrong');
            setScore(result.total_score);

            // Wait 2 seconds then next question
            setTimeout(() => {
                setShowFeedback(null);
                setSelectedAnswer(null);
                if (currentQIndex < questions.length - 1) {
                    setCurrentQIndex(prev => prev + 1);
                } else {
                    setGameState('results');
                }
            }, 2000);

        } catch (e) {
            console.error(e);
        }
    };

    const handleOptionSelect = (opt: string) => {
        if (selectedAnswer || showFeedback) return;
        setSelectedAnswer(opt);
        const timeTaken = 15 - timeLeft;
        submitAnswer(opt, timeTaken);
    };


    if (gameState === 'loading') return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Arena...</div>;

    if (gameState === 'waiting') {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center space-y-6">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <h2 className="text-2xl font-bold">Waiting for Opponent...</h2>
                <p className="text-slate-400">Share Game Code: <span className="font-mono text-white bg-slate-800 px-2 py-1 rounded">{game?.game_code}</span></p>
                <div className="text-sm text-slate-500">The game will start automatically when player joins.</div>
            </div>
        );
    }

    if (gameState === 'results') {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center space-y-8">
                 <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                     GAME OVER
                 </h1>
                 <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-sm">
                     <div className="text-slate-400 mb-2">Final Score</div>
                     <div className="text-6xl font-bold mb-6">{score}</div>
                     
                     <div className="space-y-4">
                        {game?.winner_id ? (
                            <div className="text-xl font-bold text-green-400">Winner Declared!</div>
                        ) : (
                            <div className="text-sm text-slate-500">Calculating results...</div>
                        )}
                        
                        <button onClick={() => router.push('/lobby')} className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200">
                            Back to Lobby
                        </button>
                     </div>
                 </div>
            </div>
        );
    }
    
    // Playing State
    const currentQ = questions[currentQIndex];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800">
                <div className="font-bold text-slate-400 text-sm">Q {currentQIndex + 1}/{questions.length}</div>
                <div className="flex items-center gap-2 font-mono text-xl">
                    <div className={clsx("w-3 h-3 rounded-full animate-pulse", timeLeft < 5 ? 'bg-red-500' : 'bg-green-500')} />
                    {timeLeft}s
                </div>
                <div className="font-bold text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                    {score} pts
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
                <AnimatePresence mode='wait'>
                    <motion.div 
                        key={currentQ?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full space-y-8"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-center leading-tight">
                            {currentQ?.text}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentQ?.options?.map((opt: string, idx: number) => {
                                const isSelected = selectedAnswer === opt;
                                let statusClass = 'bg-slate-800 border-slate-700 hover:bg-slate-700';
                                
                                if (showFeedback) {
                                    if (isSelected && showFeedback === 'correct') statusClass = 'bg-green-600 border-green-500';
                                    else if (isSelected && showFeedback === 'wrong') statusClass = 'bg-red-600 border-red-500';
                                    else statusClass = 'opacity-50 bg-slate-800';
                                } else if (isSelected) {
                                     statusClass = 'bg-indigo-600 border-indigo-500';
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={!!selectedAnswer}
                                        className={`p-6 rounded-xl border-2 text-left font-semibold text-lg transition-all transform active:scale-95 ${statusClass}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{opt}</span>
                                            {showFeedback && isSelected && (
                                                showFeedback === 'correct' ? <CheckCircle className="text-white" /> : <XCircle className="text-white" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
             {/* Progress Bar */}
             <div className="h-2 bg-slate-900 w-full">
                 <motion.div 
                    className="h-full bg-indigo-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentQIndex) / questions.length) * 100}%` }}
                 />
             </div>
        </div>
    );
}
