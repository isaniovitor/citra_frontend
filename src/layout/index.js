import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar  from './Navbar';
import { OutletStyles } from './styles';

const Layout = () => {
	return(
		<>
			<Navbar />

			<OutletStyles>
				<Outlet />
			</OutletStyles>
		</>
	);
};

export default Layout;
