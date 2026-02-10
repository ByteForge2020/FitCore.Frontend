import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import { store } from './store/store';
import {
    AuthenticationProvider
} from './api/authentication/AuthenticationProvider/authentication-provider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AuthenticationProvider/>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);

