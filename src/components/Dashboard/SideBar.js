import React, { useState } from 'react';
import links from '../../utils/links';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
function SideBar() {
	return (
		<Wrapper>
			<div className='nav-links'>
				{links.map((link) => {
					const { text, path, id, icon } = link;
					return (
						<NavLink
							to={path}
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
							key={id}
							end
						>
							<span className='icon'>{icon}</span>
							{text}
						</NavLink>
					);
				})}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.nav-links {
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
	}
	.nav-link {
		display: flex;
		align-items: center;
		color: var(--grey-500);
		padding: 1rem 0;
		text-transform: capitalize;
		transition: var(--transition);
	}
	.nav-link:hover {
		color: var(--grey-900);
	}
	.nav-link:hover .icon {
		color: var(--primary-500);
	}
	.icon {
		font-size: 1.5rem;
		margin-right: 1rem;
		display: grid;
		place-items: center;
		transition: var(--transition);
	}
	.active {
		color: var(--grey-900);
	}
	.active .icon {
		color: var(--primary-500);
	}
`;

export default SideBar;
