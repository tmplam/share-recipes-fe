import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

// Guess pages
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';

import StatisticsPage from './pages/StatisticsPage';

// Login user pages
import CreateRecipePage from './pages/User/CreateRecipePage';
import FavouritePage from './pages/User/FavourtitePage';
import PostedPage from './pages/User/PostedPage';

// Admin pages
import PendingPage from './pages/Admin/PendingPage';

import RequireAuth from './components/RequireAuth';
import Logout from './components/Logout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,

        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'recipes',
                children: [
                    {
                        path: ':recipeId',
                        element: <DetailPage />,
                    },
                    {
                        path: '',
                        element: <RequireAuth all />,
                        children: [
                            {
                                path: 'create',
                                element: <CreateRecipePage />,
                            },
                            {
                                path: 'favourite',
                                element: <FavouritePage />,
                            },
                            {
                                path: 'posted',
                                element: <PostedPage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'logout',
                element: <Logout />,
            },
            // TEST
            {
                path: 'unauthorized',
                element: <UnauthorizedPage />,
            },
            {
                path: 'admin/pending',
                element: <PendingPage />,
            },
            {
                path: 'admin/statistics',
                element: <StatisticsPage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
