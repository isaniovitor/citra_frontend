// import { Observer } from 'mobx-react-lite';
// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// import { useAuth } from '~/contexts/AuthContext';

// function PrivateRoute() {
//   const { isLogged } = useAuth();
//   const location = useLocation();

//   return (
//     <Observer>
//       {() => {
//         isLogged ? (
//           <Outlet />
//         ) : (
//           <Navigate to="/login" state={{ from: location }} />
//         );
//       }}
//     </Observer>
//   );
// }

// export default PrivateRoute;

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

function PrivateRoutes() {
  const { isLogged, user } = useAuth();
  // console.log(isLogged, user);

  return !isLogged ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRoutes;
