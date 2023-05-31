import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import page_not_found from '../assets/images/not-found.svg';
const Error = () => {
	return (
		<Wrapper className='page-100'>
			<section>
				<img src={page_not_found} alt='page not found' />
				<h3>Opps! Nič tu nie je…</h3>
				<p>
					Na tejto stránke žiaľ nič nie je, skúste sa vrátiť do nášho obchodu a
					dúfame, že si vyberiete.
				</p>
				<Link to='/' className='btn'>
					Naspäť do obchodu
				</Link>
			</section>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	h1 {
		font-size: 10rem;
	}
	h3 {
		text-transform: none;
		margin-bottom: 2rem;
	}
	img {
		width: 90vw;
		max-width: 600px;
		display: block;
		margin-bottom: 2rem;
	}
	/* display: flex;
	align-items: center;
	justify-content: center;
	h3 {
		margin-bottom: 0.5rem;
	}
	p {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: var(--grey-500);
	}
	a {
		color: var(--primary-500);
		text-decoration: none;
		text-transform: capitalize;
	} */
`;

export default Error;
