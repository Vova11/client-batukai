import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { links } from '../utils/constants';
const Navbar = () => {
	return (
		<ul>
			{links.map((link) => {
				const { id, text, url } = link;
				return (
					<li>
						<Link to={url} key={id} className='nav-link'>
							{text}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default Navbar;
