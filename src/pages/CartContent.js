import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { CartColumns, CartItem, CartTotals } from '.';
import { Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
const CartContent = () => {
	const { cart } = useSelector((store) => store.cart);

	const dispatch = useDispatch();
	const handleClearCart = () => {
		dispatch(clearCart());
	};

	return (
		<Wrapper>
			<CartColumns />
			{cart.map((item) => {
				return <CartItem key={item.productId} {...item} />;
			})}
			<hr />
			<div className='link-container'>
				<Link to='/products' className='link-btn'>
					continue shopping
				</Link>
				<button
					type='button'
					className='link-btn clear-btn'
					onClick={handleClearCart}
				>
					clear shopping cart
				</button>
			</div>
			<CartTotals />
		</Wrapper>
	);
};

export default CartContent;

const Wrapper = styled.section`
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
