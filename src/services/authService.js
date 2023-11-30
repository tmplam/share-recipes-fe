import axios from '~/utils/api';

export const register = async (username, password) => {
    const response = await axios.post(
        'auth/register',
        { username, password },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    const data = response.data;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    const authInfo = {
        token: data.accessToken,
        roles: data.role,
        expiration: expiration.toString(),
    };
    return authInfo;
};

export const login = async (username, password) => {
    const response = await axios.post(
        'auth/login',
        { username, password },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    const data = response.data;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    const authInfo = {
        token: data.accessToken,
        roles: data.roles,
        expiration: expiration.toString(),
    };
    return authInfo;
};
