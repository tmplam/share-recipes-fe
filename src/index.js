import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import GlobalStyles from '~/components/GlobalStyles';
import { AuthProvider } from '~/contexts/AuthContext';
import { SearchProvider } from '~/contexts/SearchContext';
import { UserInfoProvider } from '~/contexts/UserInfoContext';
import { ForceReloadProvider } from '~/contexts/ForceReloadContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Boostrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <GlobalStyles>
            <SearchProvider>
                <UserInfoProvider>
                    <ForceReloadProvider>
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
                    </ForceReloadProvider>
                </UserInfoProvider>
            </SearchProvider>
        </GlobalStyles>
    </AuthProvider>,
);
