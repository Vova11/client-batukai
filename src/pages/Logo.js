import React from 'react';
import logo from '../assets/images/logo.png';
const Logo = () => {
	return (
		<img
			src={logo}
			alt='sweetvape.eu'
			width='50'
			height='50'
			className='d-inline-block align-top'
		></img>
	);
};

export default Logo;
