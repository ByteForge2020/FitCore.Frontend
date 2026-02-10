import { apiClient, authApiClient, externalApiClient } from './config';

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

// Example API requests using the main API client
export const userApi = {
  getUserById: async (userId: string | number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.post<User>('/users', userData);
    return response.data;
  },

  updateUser: async (userId: string | number, userData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: string | number): Promise<{ ok: boolean }> => {
    const response = await apiClient.delete<{ ok: boolean }>(`/users/${userId}`);
    return response.data;
  },
};

// Example API requests using external API client (different host)
export const externalApi = {
  getPosts: async (): Promise<Post[]> => {
    const response = await externalApiClient.get<Post[]>('/posts');
    return response.data;
  },

  getPostById: async (postId: number): Promise<Post> => {
    const response = await externalApiClient.get<Post>(`/posts/${postId}`);
    return response.data;
  },

  getPostComments: async (postId: number): Promise<unknown[]> => {
    const response = await externalApiClient.get<unknown[]>(`/posts/${postId}/comments`);
    return response.data;
  },
};

// Example API requests using auth API client (different endpoint)
export const authApi = {
  login: async (credentials: AuthCredentials): Promise<{ token: string }> => {
    const response = await authApiClient.post<{ token: string }>('/login', credentials);
    return response.data;
  },

  register: async (userData: Partial<User> & AuthCredentials): Promise<User> => {
    const response = await authApiClient.post<User>('/register', userData);
    return response.data;
  },

  logout: async (): Promise<{ ok: boolean }> => {
    const response = await authApiClient.post<{ ok: boolean }>('/logout');
    return response.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await authApiClient.post<{ token: string }>('/refresh');
    return response.data;
  },
};

