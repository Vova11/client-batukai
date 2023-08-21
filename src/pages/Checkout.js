import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageHero, OrderForm } from './';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { formatPrice } from '../utils/helpers';
const Checkout = () => {
	const { cart, total_items, total_amount, shipping_fee } = useSelector(
		(store) => store.cart
	);
	return (
		<Wrapper>
			<PageHero title='Checkout' />

			<Container className='section section-center'>
				<h2>Place your order</h2>
				<hr />
				<Row>
					<Col xs='12' lg='6'>
						<OrderForm />
					</Col>
					<Col xs lg='6'>
						<Wrapper>
							<h4>Your order:</h4>
							<Card>
								<Card.Body>
									<Card.Text>
										{cart.map((item) => {
											return (
												<Fragment>
													<ul className='product-checkout-list'>
														<li>Name of product: {item.name}</li>
														<li>Size: {item.size}</li>
														<li>Quantity: {item.amount}</li>
													</ul>
													<hr />
												</Fragment>
											);
										})}
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
										<hr />
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
			</Container>
		</Wrapper>
	);
};

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

export default Checkout;
