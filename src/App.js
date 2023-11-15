import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import CreateRecipePage from './pages/CreateRecipePage';
import UnauthorizedPage from './pages/UnauthorizedPage';

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
                        element: <RequireAuth allowedRoles={['User', 'Admin', 'SuperAdmin']} />,
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
            {
                path: 'unauthorized',
                element: <UnauthorizedPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
