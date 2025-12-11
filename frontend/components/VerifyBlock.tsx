'use client';

import { MiniKit, VerificationLevel, ISuccessResult, MiniAppVerifyActionPayload } from '@worldcoin/minikit-js';
import { useState, useEffect } from 'react';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function VerifyBlock() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if MiniKit is installed
    if (!MiniKit.isInstalled()) {
      console.warn("MiniKit not installed");
      // For development outside World App, we might want a bypass
      return;
    }

    // Listen for verification response
    MiniKit.subscribe(async (payload: any) => {
      if (payload.status === 'success') {
        const response = payload as ISuccessResult;
        console.log("Verification Success:", response);
        setLoading(true);
        
        try {
            // Send proof to backend
            await authService.verify({
                proof: response.proof,
                merkle_root: response.merkle_root,
                nullifier_hash: response.nullifier_hash,
                credential_type: response.credential_type,
                action: 'verify-human', 
                signal: '',
            });
            
            // Redirect to Lobby
            router.push('/lobby');
            
        } catch (error) {
            console.error("Backend verification failed", error);
            alert("Login failed. Check console.");
        } finally {
            setLoading(false);
        }
      }
    });

    return () => {
        try {
             MiniKit.unsubscribe();
        } catch (e) { console.error(e) }
    };
  }, [router]);


  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
        console.error("MiniKit not installed");
        
        // DEV BYPASS: If local and minikit not present, allow mock login
        if (process.env.NODE_ENV === 'development') {
             // Mock verify
             const mockData = {
                proof: 'mock_proof',
                merkle_root: 'mock_root',
                nullifier_hash: 'mock_nullifier_' + Date.now(),
                credential_type: 'orb',
                action: 'verify-human',
             };
             try {
                await authService.verify(mockData);
                router.push('/lobby');
             } catch(e) { 
                 console.error(e); 
                 alert("Mock login failed. Make sure backend is running.");
             }
             return;
        }
        return;
    }
    
    const verifyPayload = {
      action: 'verify-human', // Must match action in Dev Portal
      signal: '', // Optional signal
      verification_level: VerificationLevel.Orb, // Correct enum usage
    };
    
    MiniKit.commands.verify(verifyPayload);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-xl font-bold text-white">Verify you are human</h3>
      <p className="text-slate-400 text-sm text-center">
        To play Trivia Streak Wars for real stakes, you need to verify with World ID.
      </p>
      
      <button
        onClick={handleVerify}
        disabled={loading}
        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center space-x-2 disabled:opacity-50"
      >
        <span>{loading ? 'Verifying...' : 'Verify via World App'}</span>
      </button>
    </div>
  );
}
