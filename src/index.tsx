import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Login from './views/Login';

import { GlobalStyles } from './styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Login />
  </React.StrictMode>,
);
