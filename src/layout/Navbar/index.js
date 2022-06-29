import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../..//contexts/AuthContext';
import logo from '../../assets/logo.png';
import singOutIcon from '../../assets/singOut.png';


import * as S from './styles';

const Navbar = () => {

	const navigate = useNavigate();
  const { userUpdate, user, singOut } = useAuth();
  const location = useLocation();


	// const logout = () => {
	// 	localStorage.clear();
	// 	sessionStorage.clear();
	// 	navigate('/login', { replace: true });
	// };

	return (
		<S.NavbarStyles>
				<Link to={'/home'}>
					<img src={logo} alt="" style={{width: '100px', height: "50px"}} />
				</Link>

        {(location.pathname === '/userJobs' || location.pathname === '/userCandidacies' )&&
           <p style={{width: '100px', margin: "0", textAlign: "center", whiteSpace: "nowrap", fontSize: "20px", color: "white"}}>
            {location.pathname === '/userJobs' ? "Vagas" : "Candidaturas"}
          </p>
        }

        <Link to={'/profile'} style={{width: '100px', display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <img src={singOutIcon} alt=""  onClick={() => {singOut();}}  style={{width: '30px', height: "30px", color: "white"}} />
					<S.ImgStyles src={user.picture} alt="User Image" />
				</Link>
		</S.NavbarStyles>
	);
};

export default Navbar;
