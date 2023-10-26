import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUp';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <SignUp /> }],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
