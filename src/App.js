import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
