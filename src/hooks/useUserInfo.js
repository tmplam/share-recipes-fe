import { useContext } from 'react';
import UserInfoContext from '~/contexts/UserInfoContext';

const useUserInfo = () => {
    return useContext(UserInfoContext);
};

export default useUserInfo;
