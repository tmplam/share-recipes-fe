import { useContext } from 'react';
import SearchContext from '~/contexts/SearchContext';

const useAuth = () => {
    return useContext(SearchContext);
};

export default useAuth;
