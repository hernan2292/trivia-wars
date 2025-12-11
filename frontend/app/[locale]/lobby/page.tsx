'use client';

import { useState, useEffect } from 'react';
import { gameService, authService } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Swords, Zap, Trophy, Coins } from 'lucide-react';

export default function LobbyPage() {
    const router = useRouter();
    const [findingMatch, setFindingMatch] = useState(false);
    const [stakeAmount, setStakeAmount] = useState(0.5);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const u = authService.getUser();
        if (!u) {
            router.push('/');
        }
        setUser(u);
    }, [router]);

    const handleQuickMatch = async () => {
        setFindingMatch(true);
        try {
            // Attempt to join any existing 1v1 game or create/wait
            const res = await gameService.joinGame(undefined, stakeAmount);
            if (res.game) {
                // If game starts immediately (e.g. we joined and it filled up), valid.
                // Or if we are waiting.
                // We should redirect to Game Room.
                router.push(`/game/${res.game.id}`);
            }
        } catch (error) {
            console.error(error);
            // If 404, create one
             try {
                const newGame = await gameService.createGame(stakeAmount, '1v1');
                router.push(`/game/${newGame.game.id}`);
             } catch (createError) {
                 console.error(createError);
                 alert("Could not start game.");
                 setFindingMatch(false);
             }
        }
    };

    if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6">
            <header className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-lg font-bold">
                        {user.username?.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-bold">{user.username}</h2>
                        <span className="text-xs text-indigo-300">Newbie</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700">
                    <Coins className="text-yellow-400 w-4 h-4" />
                    <span className="font-mono">{user.total_earned || '0.00'} USDC</span>
                </div>
            </header>

            <main className="max-w-md mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black italic uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500">
                        Battle Arena
                    </h1>
                    <p className="text-slate-400 text-sm">Choose your stakes and crush your opponent.</p>
                </div>

                {/* Stake Selector */}
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-4 block">Select Stake</label>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {[0.5, 1, 3, 5].map((amt) => (
                            <button
                                key={amt}
                                onClick={() => setStakeAmount(amt)}
                                className={`py-3 rounded-xl font-bold text-sm transition-all border-2 
                                ${stakeAmount === amt 
                                    ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                                    : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500'}`}
                            >
                                ${amt}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleQuickMatch}
                        disabled={findingMatch}
                        className="w-full relative group overflow-hidden bg-white text-black font-black py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center justify-center gap-2">
                            {findingMatch ? (
                                <>
                                    <Swords className="animate-pulse" /> Finding Opponent...
                                </>
                            ) : (
                                <>
                                    <Swords /> FIND MATCH
                                </>
                            )}
                        </span>
                    </button>
                </div>

                {/* Daily Free */}
                <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 p-4 rounded-xl border border-green-800 flex items-center justify-between cursor-pointer hover:bg-green-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Zap className="text-green-400 w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-green-100">Daily Free Play</h3>
                            <p className="text-xs text-green-300">Practice without risk</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold bg-green-950 text-green-400 px-2 py-1 rounded">3/3 Left</span>
                </div>

                {/* Leaderboard Teaser */}
                <div className="space-y-3 pt-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-400">Top Players</span>
                        <span className="text-indigo-400 cursor-pointer hover:underline">View All</span>
                    </div>
                    {[1, 2, 3].map((i) => (
                         <div key={i} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                             <div className="flex items-center gap-3">
                                 <span className={`font-bold w-4 ${i===1 ? 'text-yellow-400' : 'text-slate-500'}`}>#{i}</span>
                                 <span>User_Demo{i}</span>
                             </div>
                             <span className="font-mono text-sm text-green-400">${100 - i * 15}</span>
                         </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
