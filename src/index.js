import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
