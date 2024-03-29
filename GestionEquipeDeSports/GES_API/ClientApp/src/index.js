import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider-with-navigate';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./styles/styles.css";

const root = createRoot(document.getElementById('root'));
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

root.render(
    <BrowserRouter basename={baseUrl}>
        <Auth0ProviderWithNavigate>
            <App />
        </Auth0ProviderWithNavigate>
    </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
