import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/login/profile.png';

import * as S from './styles';


export const SidebarData = [
	{
		title: 'Inicio',
		path: '/inicio',
	},
	{
		title: 'Estatísticas',
		path: '/estatisticas',
	},
	{
		title: 'Operações',
		path: '/operacoes',
	},
	{
		title: 'Forças',
		path: '/forcas',
	}
];

const Navbar = () => {

	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		sessionStorage.clear();
		navigate('/login', { replace: true });
	};

	return (
		< S.NavbarStyles>
				<Link to={'/'}>
					<label>SGO</label>
				</Link>

        <Link to={'/'}>
					< S.ImgStyles src={profile} alt="User Image" />
				</Link>
		</S.NavbarStyles>
	);
};

export default Navbar;
