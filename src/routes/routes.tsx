import { Navigate, RouteObject } from 'react-router-dom';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import AppLayout from '../components/AppLayout';

const appRoutes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: '',
                element: <Navigate to="/login" replace />,
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage />,
            },
            {
                path: 'main',
                element: <MainPage />,
            },
            {
                path: '*',
                element: <Navigate to="/login" replace />,
            },
        ],
    },
];

export default appRoutes;
