import { apiClient } from './config';

export interface User {
  id: string | number;
  name?: string;
  email?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Example API requests using auth API client (different endpoint)
export const authApi = {
  login: async (credentials: AuthCredentials): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>('/login', credentials);
    return response.data;
  },

  register: async (userData: Partial<User> & AuthCredentials): Promise<User> => {
    const response = await apiClient.post<User>('/register', userData);
    return response.data;
  },

  logout: async (): Promise<{ ok: boolean }> => {
    const response = await apiClient.post<{ ok: boolean }>('/logout');
    return response.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>('/refresh');
    return response.data;
  },
};

