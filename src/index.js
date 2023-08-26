import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import store from './store_v1';

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
