import { createContext, useState } from 'react';
import { getAuthInfo } from '~/utils/authInfo';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const authInfo = getAuthInfo();
        return authInfo;
    });

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
