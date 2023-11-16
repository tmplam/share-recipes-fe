import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

// Regular user pages
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import CreateRecipePage from './pages/CreateRecipePage';
import UnauthorizedPage from './pages/UnauthorizedPage';

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
                        children: [{ path: 'create', element: <CreateRecipePage /> }],
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
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
