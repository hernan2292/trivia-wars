import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authService = {
  verify: async (proofData: any) => {
    // proofData structure should match what backend expects
    // { proof, merkle_root, nullifier_hash, credential_type, action, signal }
    const response = await api.post('/auth/verify', proofData);
    if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  },
  getUser: () => {
      if (typeof window !== 'undefined') {
          const user = localStorage.getItem('user_info');
          return user ? JSON.parse(user) : null;
      }
      return null;
  }
};

export const gameService = {
  createGame: async (stakeAmount: number, type: '1v1' | 'free' = '1v1') => {
    const response = await api.post('/games/create', { stake_amount: stakeAmount, game_type: type });
    return response.data;
  },
  joinGame: async (gameCode?: string, stakeAmount?: number) => {
    const payload: any = {};
    if (gameCode) payload.game_code = gameCode;
    if (stakeAmount !== undefined) payload.stake_amount = stakeAmount;
    
    const response = await api.post('/games/join', payload);
    return response.data;
  },
  getGameStatus: async (gameId: number) => {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  },
  submitAnswer: async (gameId: number, questionId: number, answer: string, timeTaken: number) => {
    const response = await api.post(`/games/${gameId}/submit`, {
       question_id: questionId,
       answer,
       time_taken: timeTaken
    });
    return response.data;
  }
};

export default api;
