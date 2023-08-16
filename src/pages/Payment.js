import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHero from './PageHero';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Payment = () => {
	const navigate = useNavigate();
	// Read data from local storage
	const orderFormData = JSON.parse(localStorage.getItem('orderForm'));
	const cartData = JSON.parse(localStorage.getItem('cart'));

	const { cart, total_items, total_amount, shipping_fee } = useSelector(
		(store) => store.cart
	);

	return (
		<Wrapper>
			<PageHero title='Pay' />

			<Container className='section section-center'>
				<Row>
					<Col lg='12'>
						<Wrapper className=''>
							<div className='empty'>
								<h2>Payment gateway</h2>
								<Link to='/products' className='btn'>
									fill it
								</Link>
							</div>
						</Wrapper>
					</Col>
				</Row>
				<Row>
					<Col xs='12'>
						<div className='link-container'>
							<Link to='/review' className='link-btn'>
								Go back
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
};

export default Payment;

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
