import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '.';

const SharedLayout = () => {
	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
};

export default SharedLayout;
