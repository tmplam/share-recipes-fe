import { createContext, useState } from 'react';

const ForceReloadContext = createContext({});

export const ForceReloadProvider = ({ children }) => {
    const [reloadTotalPending, setReloadTotalPending] = useState({});
    return (
        <ForceReloadContext.Provider
            value={{ _totalPending: { reloadTotalPending, setReloadTotalPending } }}
        >
            {children}
        </ForceReloadContext.Provider>
    );
};

export default ForceReloadContext;
