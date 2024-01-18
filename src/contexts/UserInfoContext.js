import { createContext, useState, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import axios from '~/utils/api';

const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
    const { auth } = useAuth();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (auth?.token && auth?.token !== 'EXPIRED') {
            axios
                .get('user/profile', {
                    headers: {
                        Authorization: auth.token,
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    const data = response.data.data;
                    setUserInfo(data);
                })
                .catch((error) => {
                    // console.log(error);
                });
        }
    }, [auth]);

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export default UserInfoContext;
