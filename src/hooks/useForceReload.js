import { useContext } from 'react';
import ForceReloadContext from '~/contexts/ForceReloadContext';

const useForceReload = () => {
    return useContext(ForceReloadContext);
};

export default useForceReload;
