import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/login/profile.png';

import * as S from './styles';

const Navbar = () => {

	const navigate = useNavigate();
	// const logout = () => {
	// 	localStorage.clear();
	// 	sessionStorage.clear();
	// 	navigate('/login', { replace: true });
	// };

	return (
		<S.NavbarStyles>
				<Link to={'/home'}>
					<label>SGO</label>
				</Link>

        <Link to={'/profile'}>
					<S.ImgStyles src={profile} alt="User Image" />
				</Link>
		</S.NavbarStyles>
	);
};

export default Navbar;
