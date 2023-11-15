export function getTokenDuration() {
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const expirationDate = new Date(authInfo.expiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthInfo() {
    let authInfo = localStorage.getItem('authInfo');
    if (!authInfo) {
        return null;
    }

    authInfo = JSON.parse(authInfo);

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return { ...authInfo, token: 'EXPIRED' };
    }

    return authInfo;
}

// export function authInfoLoader() {
//     return getAuthInfo();
// }

// export function checkAuth() {
//     const token = getAuthToken();

//     if (!token) {
//         return redirect('/login');
//     }
//     return null;
// }
