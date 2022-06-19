import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useCandidacy } from '../contexts/CandicacyContext';
import { useJob } from '../contexts/JobContext';

function PrivateRoutes() {
  // console.log(isLogged, user);
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn, isLogged, user } = useAuth();
  const { jobs, getJobs, getUserCandidacies, getUserJobs } = useJob();
  const { getCandidacies } = useCandidacy();

  useEffect(() => {
    // async function getJobData() {
    //   await getJobs();
    //   await getCandidacies();
    // }

    async function fetchData() {
      if (localStorage.getItem('token')) {
        const [email, password] = [
          localStorage.getItem('token')?.split(',')[0],
          localStorage.getItem('token')?.split(',')[1],
        ];

        if (await signIn({ Email: email, password })) {
          // await getCandidacies();

          navigate(`${location.pathname}`, { replace: true });
          // return <Outlet />;
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function getJobData() {
      await getJobs();
    }

    getJobData();
  }, []);

  useEffect(() => {
    async function getJobData() {
      // await getJobs();
      await getUserCandidacies({ userID: user?.userId, currentJobs: jobs });
      await getUserJobs({ userID: user?.userId, currentJobs: jobs });
      await getCandidacies();
    }

    getJobData();
  }, [jobs]);

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
