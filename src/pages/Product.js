import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import deafult from '../assets/images/hero-bcg-222.jpeg';
const Product = ({ images, name, price, id }) => {
	return (
		<Wrapper>
			<div className='container-product'>
				{images.length > 0 ? (
					<img src={images[0].url} alt={name} />
				) : (
					<img src={deafult} alt='default' />
				)}
				<Link to={`/products/${id}`} className='link'>
					<FaSearch />
				</Link>
			</div>
			<footer>
				<h5>{name}</h5>
				<p>{formatPrice(price)}</p>
			</footer>
		</Wrapper>
	);
};
const Wrapper = styled.article`
	.container-product {
		position: relative;
		/* background: var(--clr-black); */
		background: transparent;
		border-radius: var(--radius);
	}
	img {
		width: 100%;
		display: block;
		object-fit: cover;
		height: 100% !important;

		border-radius: var(--radius);
		transition: var(--transition);
	}
	.link {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: var(--clr-primary-5);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		transition: var(--transition);
		opacity: 0;
		cursor: pointer;
		svg {
			font-size: 1.25rem;
			color: var(--clr-white);
		}
	}
	.container-product:hover img {
		opacity: 0.5;
	}
	.container-product:hover .link {
		opacity: 1;
	}
	footer {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	footer h5,
	footer p {
		margin-bottom: 0;
		font-weight: 400;
	}
	footer p {
		color: var(--clr-primary-5);
		letter-spacing: var(--spacing);
	}
`;
export default Product;
