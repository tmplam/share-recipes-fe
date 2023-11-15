import { Navigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

function Logout() {
    const { setAuth } = useAuth();

    localStorage.removeItem('authInfo');
    setAuth(null);

    return <Navigate to="/" state={{ from: '/login' }} replace />;
}

export default Logout;
