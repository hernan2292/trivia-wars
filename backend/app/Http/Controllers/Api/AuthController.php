<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Verify World ID proof and log the user in.
     */
    public function verify(Request $request)
    {
        $request->validate([
            'proof' => 'required',
            'merkle_root' => 'required',
            'nullifier_hash' => 'required',
            'credential_type' => 'required',
            'action' => 'required', // e.g., "verify-human"
            'signal' => 'nullable',
        ]);

        $proof = $request->input('proof');
        $merkleRoot = $request->input('merkle_root');
        $nullifierHash = $request->input('nullifier_hash');
        $credentialType = $request->input('credential_type');
        $action = $request->input('action');
        $signal = $request->input('signal', '');

        // 1. Verify with World ID API
        $isValid = $this->verifyProof($proof, $merkleRoot, $nullifierHash, $credentialType, $action, $signal);

        if (!$isValid) {
            return response()->json(['error' => 'Invalid World ID proof'], 401);
        }

        // 2. Find or Create User by Nullifier Hash (Unique per user per app)
        // Note: In a real app, we might want to map nullifier to a user ID.
        // We use check if a user with this world_id exists.
        
        $user = User::firstOrCreate(
            ['world_id' => $nullifierHash],
            [
                'username' => 'User_' . substr($nullifierHash, 0, 8),
                'password' => Hash::make(Str::random(32)), // Random password, auth via World ID
            ]
        );

        // 3. Create API Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Authenticated successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }

    private function verifyProof($proof, $merkleRoot, $nullifierHash, $credentialType, $action, $signal)
    {
        $appId = config('services.worldcoin.app_id');
        
        // Use Mock verification for local dev if configured
        if (config('app.env') === 'local' && config('services.worldcoin.mock_verify', false)) {
            Log::info('Mocking World ID Verification check');
            return true;
        }

        try {
            $response = Http::post("https://developer.worldcoin.org/api/v1/verify/{$appId}", [
                'proof' => $proof,
                'merkle_root' => $merkleRoot,
                'nullifier_hash' => $nullifierHash,
                'credential_type' => $credentialType,
                'action' => $action,
                'signal' => $signal,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['success'] ?? false;
            }

            Log::error('World ID Verification Failed: ' . $response->body());
            return false;

        } catch (\Exception $e) {
            Log::error('World ID Exception: ' . $e->getMessage());
            return false;
        }
    }
}
