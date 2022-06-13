import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../..//contexts/AuthContext';
import logo from '../../assets/logo.png';

import * as S from './styles';

const Navbar = () => {

	const navigate = useNavigate();
  const { userUpdate, user } = useAuth();

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

        <Link to={'/profile'}>
					<S.ImgStyles src={user.picture} alt="User Image" />
				</Link>
		</S.NavbarStyles>
	);
};

export default Navbar;
