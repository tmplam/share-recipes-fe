import { createContext, useState } from 'react';

const ForceReloadContext = createContext({});

export const ForceReloadProvider = ({ children }) => {
    const [reloadTotalPending, setReloadTotalPending] = useState({});
    const [reloadHome, setReloadHome] = useState({});

    return (
        <ForceReloadContext.Provider
            value={{
                _totalPending: {
                    reloadTotalPending,
                    setReloadTotalPending,
                },
                _homeReload: { reloadHome, setReloadHome },
            }}
        >
            {children}
        </ForceReloadContext.Provider>
    );
};

export default ForceReloadContext;
