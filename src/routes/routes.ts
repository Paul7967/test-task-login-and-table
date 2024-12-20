import LoginPage from '@/pages/LoginPage';
import React from 'react';
import { 
  Navigate, 
  RouteObject
} from 'react-router-dom';


const appRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />,
    }
//   {
//     path: '/',
//     element: <Navigate to="/login" replace />
//   },
//   {
//     path: '/reset-password',
//     element: <ResetPasswordPage />
//   },
//   {
//     path: '/reset-password',
//     element: <ResetPasswordPage />
//   },
//   {
//     path: '/main',
//     element: <MainPage />
//   },
//   {
//     path: '*',
//     element: <Navigate to="/login" replace />
//   }
];

export default appRoutes;