import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';

import Layout from '../layout';
import UserEditProfile from '../views/EditProfile';
import Home from '../views/Home';
import Login from '../views/Login';
import RegisterJob from '../views/RegisterJob';
import UserProfile from '../views/UserProfile';
import UserRegister from '../views/UserRegister';
import PrivateRoutes from './privateRoute';
// import PrivateRoute from './privateRoute';

const routes = [
  {
    path: '/',
    element: <Login />,
  },

  {
    path: '/userRegister',
    element: <UserRegister />,
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/home',
            element: <Home />,
          },

          {
            path: '/profile',
            element: <UserProfile />,
          },

          {
            path: '/editProfile',
            element: <UserEditProfile />,
          },

          {
            path: '/registerJob',
            element: <RegisterJob />,
          },
        ],
      },
    ],
  },
];

export default routes;
