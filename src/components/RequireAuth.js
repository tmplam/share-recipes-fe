import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowedRoles, all }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.token && auth?.token !== 'EXPIRED' ? (
        all || auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
            <Outlet />
        ) : (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        )
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
