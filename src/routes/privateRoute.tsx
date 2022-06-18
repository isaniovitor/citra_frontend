import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

function PrivateRoutes() {
  // console.log(isLogged, user);
  const location = useLocation();
  const { signIn, isLogged } = useAuth();
  const navigate = useNavigate();

  async function fetchData() {
    if (localStorage.getItem('token')) {
      const [email, password] = [
        localStorage.getItem('token')?.split(',')[0],
        localStorage.getItem('token')?.split(',')[1],
      ];

      if (await signIn({ Email: email, password })) {
        // console.log(location.pathname);

        navigate(`${location.pathname}`, { replace: true });
        // return <Outlet />;
      }

      // if (await signIn({ Email: email, password })) {
      //   console.log(location.pathname);

      //   // navigate(`/${location.pathname}`, { replace: true });
      //   // return <Outlet />;
      // }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(isLogged);
  return !isLogged ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRoutes;

// import { useEffect } from 'react';
// import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import { useAuth } from '../contexts/AuthContext';

// function PrivateRoutes() {
//   const location = useLocation();
//   const { signIn, isLogged } = useAuth();
//   const navigate = useNavigate();

//   async function fetchData() {
//     if (localStorage.getItem('token')) {
//       const [email, password] = [
//         localStorage.getItem('token')?.split(',')[0],
//         localStorage.getItem('token')?.split(',')[1],
//       ];

//       // console.log(email, password);

//       if (await signIn({ Email: email, password })) {
//         console.log(location.pathname);

//         // navigate(`/${location.pathname}`, { replace: true });
//         // return <Outlet />;
//       }
//     }
//     return !isLogged ? <Navigate to="/" /> : <Outlet />;
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);
// }

// export default PrivateRoutes;
