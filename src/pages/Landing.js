import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div>
			Landing Page
			<Link to='/dashboard'>Admin</Link>
		</div>
	);
};

export default Landing;
