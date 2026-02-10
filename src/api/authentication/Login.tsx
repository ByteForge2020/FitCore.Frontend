import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { ApiClient } from '../api/api-client';
import { useNavigate } from 'react-router-dom';
// import { Url } from '../constants/url';
import { useDispatch } from 'react-redux';
// import { authenticate } from '../../redux/authentication-slice';
import { useState } from 'react';
import { ApiClient } from '../axios/api-client';
import { authenticate } from '../../store/slices/authentication-slice';
import { Url } from '../../constants/url';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        
        const jsonData = {
            email: email,
            password: password,
        };
        
        try {
            // Здесь ваш API вызов
            ApiClient.post('/api/authentication/login', jsonData, { withCredentials: true })
                .then(response => {
                    if (response.succeeded) {
                        ApiClient.configureAuthorization(response.accessToken);
                        dispatch(authenticate());
                        navigate(Url.Appointments.Main);
                    }
                })
                .catch(error => {
                    console.error('Login failed', error);
                });
        } catch (err) {
            setError('Неверный email или пароль');
        }
    };
    
    return (
        // <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email адрес"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня"
                        />
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        {/*<Grid container>*/}
                        {/*    <Box item xs>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Забыли пароль?*/}
                        {/*        </Link>*/}
                        {/*    </Box>*/}
                        {/*    <Box item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            {"Нет аккаунта? Зарегистрируйтесь"}*/}
                        {/*        </Link>*/}
                        {/*    </Box>*/}
                        {/*</Grid>*/}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        // </ThemeProvider>
    );
}