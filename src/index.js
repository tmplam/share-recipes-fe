import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import GlobalStyles from '~/components/GlobalStyles';
import { AuthProvider } from '~/contexts/AuthContext';
import { SearchProvider } from '~/contexts/SearchContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Boostrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyles>
        <SearchProvider>
            <AuthProvider>
                <App />
                <ToastContainer
                    position="bottom-right"
                    closeOnClick={true}
                    draggable={true}
                    pauseOnHover={true}
                    hideProgressBar={false}
                    progress={undefined}
                    autoClose={1000}
                    theme="colored"
                />
            </AuthProvider>
        </SearchProvider>
    </GlobalStyles>,
);
