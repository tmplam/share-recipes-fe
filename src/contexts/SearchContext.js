import { createContext, useState } from 'react';

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
    const [keyword, setKeyword] = useState('');

    return (
        <SearchContext.Provider value={{ keyword, setKeyword }}>{children}</SearchContext.Provider>
    );
};

export default SearchContext;
