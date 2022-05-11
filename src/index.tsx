import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

import Root from './routes';
import Login from './views/Login';
import UserRegister from './views/UserRegister';

import { GlobalStyles } from './styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <>
    <GlobalStyles />

    <BrowserRouter>
      <Root />
    </BrowserRouter>
    {/* <Login /> */}

    {/* <UserRegister /> */}
  </>,
);
