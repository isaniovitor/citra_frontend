import React from 'react';
import { Navigate } from 'react-router-dom';

import Layout from '../layout';
import Home from '../views/Home';
import Login from '../views/Login';
import UserRegister from '../views/UserRegister';
// import PrivateRoute from './privateRoute';

const routes = [
  {
    path: '*',
    element: <h1>Página não encontrada.</h1>,
  },

  {
    path: '/',
    element: <Login />,
  },

  {
    path: '/userRegister',
    element: <UserRegister />,
  },

  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
];

export default routes;
