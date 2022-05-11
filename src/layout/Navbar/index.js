import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	NavOptionStyles,
	TitleStyles,
	NavbarStyles,
	NavTextStyles,
	NavItemStyles,
	TextoAndLogoStyles,
} from './styles';


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
		<NavbarStyles>
			<TextoAndLogoStyles>
				<Link to={'/'}>
					<TitleStyles>SGO</TitleStyles>
				</Link>
			</TextoAndLogoStyles>
			<NavItemStyles>
				{SidebarData.map((item, index) => {
					return (
						<NavTextStyles key={index} >
							<Link to={item.path}>
								<span>{item.title}</span>
							</Link>
						</NavTextStyles>
					);
				})}
			</NavItemStyles>
			<NavOptionStyles >
				<span onClick={() => logout()} >Sair</span>
			</NavOptionStyles>
		</NavbarStyles>
	);
};

export default Navbar;
