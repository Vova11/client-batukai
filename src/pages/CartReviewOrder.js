import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CartHero } from './';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { formatPrice } from '../utils/helpers';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CartReviewOrder = () => {
	const navigate = useNavigate();
	// Read data from local storage
	const orderFormData = JSON.parse(localStorage.getItem('orderForm'));
	const cartData = JSON.parse(localStorage.getItem('cartItems'));

	const { cart, total_items, total_amount, shipping_fee } = useSelector(
		(store) => store.cart
	);

	const handleClick = () => {
		// 👇️ replace set to true
		navigate('/about', { replace: true });
	};
	return (
		<Wrapper>
			<CartHero cart title='Review order' />

			<Container className='section section-center'>
				<Row>
					<Col xs='12' lg='6'>
						<h2>Shipping details:</h2>
						<p>First Name: {orderFormData.firstName}</p>
						<p>Last Name: {orderFormData.lastName}</p>
						<p>Email: {orderFormData.email}</p>
						<p>Phone: {orderFormData.phone}</p>
						<p>Street: {orderFormData.street}</p>
						<p>House number: {orderFormData.houseNumber}</p>
						<p>City: {orderFormData.city}</p>
						<p>Zip Code: {orderFormData.zipCode}</p>
						<p>Country: {orderFormData.country}</p>
					</Col>
					<Col xs lg='6' className={window.innerWidth < 576 ? 'mt-5' : ''}>
						<Wrapper>
							<h2>Your order:</h2>
							<Card>
								<Card.Body>
									<Card.Text>
										{cartData.map((item) => (
											<div key={item.id}>
												<p class='d-flex justify-content-between pb-2'>
													<span>
														<strong>Product name</strong>
													</span>
													<span>{item.name}</span>
												</p>
												<p class='d-flex justify-content-between pb-2'>
													<span>
														<strong>Quantity</strong>
													</span>
													<span>{item.amount}</span>
												</p>
												<p class='d-flex justify-content-between pb-2'>
													<span>
														<strong>Price</strong>
													</span>
													<span>{formatPrice(item.price)}</span>
												</p>
												<hr />
											</div>
										))}

										<p class='d-flex justify-content-between pb-2'>
											<span>Subtotal</span>
											<span class='font-medium'>
												{formatPrice(total_amount)}
											</span>
										</p>

										<p class='d-flex justify-content-between pb-2'>
											<span>Shipping</span>
											<span class='font-medium'>
												{formatPrice(shipping_fee)}
											</span>
										</p>
										<p class='d-flex justify-content-between pb-2'>
											<span class='font-bold'>Order Total</span>
											<span class='font-bold'>
												{formatPrice(total_amount + shipping_fee)}
											</span>
										</p>
									</Card.Text>
								</Card.Body>
							</Card>
						</Wrapper>
					</Col>
				</Row>
				<Row>
					<Col xs='12'>
						<div className='link-container'>
							<Link to='/cart/checkout' className='link-btn'>
								Go back
							</Link>
							<Link to='/cart/pay' className='link-btn'>
								Pay
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
};

export default CartReviewOrder;

const Wrapper = styled.section`
	.text-xs {
		font-size: 0.75rem;
		line-height: 1rem;
	}
	.pb-2 {
		padding-bottom: 0.5rem;
	}
	.font-medium {
		font-weight: 500;
	}
	.border-b {
		border-bottom-width: 1px;
	}
	.border-base-300 {
		--tw-border-opacity: 1;
		border-color: hsl(var(--b3) / var(--tw-border-opacity));
	}
	.product-checkout-list {
		padding-left: 0;
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
`;
