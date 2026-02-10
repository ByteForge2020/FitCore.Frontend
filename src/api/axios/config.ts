import axios, { type AxiosInstance } from 'axios';

type EnvMode = 'development' | 'staging' | 'production';

const getMode = (): EnvMode => {
  const mode = (import.meta.env.MODE ?? 'development') as EnvMode;
  if (mode === 'development' || mode === 'staging' || mode === 'production') return mode;
  return 'development';
};

const DEFAULTS = {
  development: {
    core: 'http://localhost:3000/api',
    auth: 'http://localhost:3000/auth',
    external: 'https://jsonplaceholder.typicode.com',
  },
  staging: {
    core: 'https://staging-api.example.com/api',
    auth: 'https://staging-api.example.com/auth',
    external: 'https://jsonplaceholder.typicode.com',
  },
  production: {
    core: 'https://api.example.com/api',
    auth: 'https://api.example.com/auth',
    external: 'https://jsonplaceholder.typicode.com',
  },
} satisfies Record<EnvMode, Record<'core' | 'auth' | 'external', string>>;

const resolveBaseURL = (service: 'core' | 'auth' | 'external'): string => {
  // Optional env overrides (useful for CI / deployments)
  const overrides = {
    core: import.meta.env.VITE_API_BASE_URL,
    auth: import.meta.env.VITE_API_AUTH_BASE_URL,
    external: import.meta.env.VITE_API_EXTERNAL_BASE_URL,
  } as const;

  return overrides[service] ?? DEFAULTS[getMode()][service];
};

const makeClient = (baseURL: string): AxiosInstance =>
  axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Main API instance (environment-based)
export const apiClient = makeClient(resolveBaseURL('core'));

// Auth API instance (environment-based, different base)
export const authApiClient = makeClient(resolveBaseURL('auth'));

// External API instance (different host)
export const externalApiClient = makeClient(resolveBaseURL('external'));

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // example: handle unauthorized
      // eslint-disable-next-line no-console
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  },
);

