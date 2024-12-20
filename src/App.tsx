import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appRoutes from './routes/routes';

const router = createBrowserRouter(appRoutes);

const App: React.FC = () => {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<p>Initial Load...</p>}
        />
    );
};

export default App;
