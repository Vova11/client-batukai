import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { updateShippingFee } from '../features/cart/cartSlice'; // Import your action for updating shipping fee

const CartTotals = () => {
	const dispatch = useDispatch();
	const { cart, total_amount, shipping_fee } = useSelector(
		(store) => store.cart
	);

	const TOTAL_IS_ABOVE = 30;
	const DEFAULT_SHIPPING_FEE = 6;

	useEffect(() => {
		if (total_amount > TOTAL_IS_ABOVE && shipping_fee !== 0) {
			// If total_amount is greater than 30 and shipping_fee is not already 0, update shipping_fee to 0
			dispatch(updateShippingFee(0));
		} else if (
			total_amount <= TOTAL_IS_ABOVE &&
			shipping_fee !== DEFAULT_SHIPPING_FEE
		) {
			// If total_amount is less than or equal to 30 and shipping_fee is not your default value, reset it to the default value
			dispatch(updateShippingFee(DEFAULT_SHIPPING_FEE)); // Dispatch an action to update the shipping_fee
		}
	}, [total_amount, shipping_fee, dispatch]);

	return (
		<Wrapper>
			<div>
				<article>
					<h5>
						subtotal :<span>{formatPrice(total_amount)}</span>
					</h5>
					<p>
						shipping fee :<span>{formatPrice(shipping_fee)}</span>
					</p>
					<hr />
					<h4>
						order total :<span>{formatPrice(total_amount + shipping_fee)}</span>
					</h4>
				</article>

				<Link to='/cart/checkout' className='btn'>
					proceed to checkout
				</Link>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 3rem;
	display: flex;
	justify-content: center;
	article {
		border: 1px solid var(--clr-grey-8);
		border-radius: var(--radius);
		padding: 1.5rem 3rem;
	}
	h4,
	h5,
	p {
		display: grid;
		grid-template-columns: 200px 1fr;
	}
	p {
		text-transform: capitalize;
	}
	h4 {
		margin-top: 2rem;
	}
	@media (min-width: 776px) {
		justify-content: flex-end;
	}
	.btn {
		width: 100%;
		margin-top: 1rem;
		text-align: center;
		font-weight: 700;
	}
`;

export default CartTotals;
