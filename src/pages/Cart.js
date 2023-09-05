import React, { useEffect } from 'react';

import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { CartContent, PageHero } from '../pages';
import { addToCart, countCartTotal } from '../features/cart/cartSlice';
import { Link, Outlet } from 'react-router-dom';
const Cart = () => {
	const { cart, clearCart, totalCost } = useSelector((store) => store.cart);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(countCartTotal());
	}, [cart]);
	if (cart.length < 1) {
		return (
			<Wrapper className='page-100'>
				<div className='empty'>
					<h2>Your cart is empty</h2>
					<Link to='/products' className='btn'>
						fill it
					</Link>
				</div>
			</Wrapper>
		);
	}
	return (
		<main>
			<PageHero title='Cart' />
			<Wrapper className='section section-center'>
				<CartContent />
				<Outlet />
			</Wrapper>
		</main>
	);
};

export default Cart;

const Wrapper = styled.section`
	.empty {
		text-align: center;
		h2 {
			margin-bottom: 1rem;
			text-transform: none;
		}
	}
	.link-container {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}
	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: var(--clr-primary-5);
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		cursor: pointer;
	}
	.clear-btn {
		background: var(--clr-black);
	}
`;
