import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n/i18n'; // init i18n config

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
