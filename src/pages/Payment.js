import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CartHero } from './';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import customFetch from '../utils/axios';
import Spinner from '../components/Dashboard/Spinner';
import { useSelector } from 'react-redux';

const Payment = () => {
	const [formData, setFormData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { shipping_fee, total_amount } = useSelector((store) => store.cart);
	const getOrderFormData = JSON.parse(localStorage.getItem('orderForm'));
	const cartItems = JSON.parse(localStorage.getItem('cartItems'));
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				// Define dataToSend with default values
				const dataToSend = {
					Mid: 'demoOMED',
					EshopId: '11111111',
					MsTxnId: Math.floor(Math.random() * 10000),
					Amount: shipping_fee + total_amount,
					CurrAlphaCode: 'EUR',
					ClientId: '110',
					FirstName: '',
					FamilyName: '',
					Email: '',
					Country: '',
					Timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
					Sign: '',
					LangCode: 'sk',
					RURL: 'https://www.sweetvape.eu/thankyou',
					NURL: 'https://www.sweetvape.eu/nurl',
					Phone: '',
					Street: '',
					City: '',
					Zip: '',
					RedirectSign: false,
					Debug: true,
					NotifyClient: 'vladimir.zembera@gmail.com',
					NotifyEmail: 'vladimir.zembera@gmail.com',
				};
				if (getOrderFormData) {
					// Populate dataToSend with getOrderFormData values if available
					dataToSend.FirstName = getOrderFormData.firstName;
					dataToSend.FamilyName = getOrderFormData.lastName;
					dataToSend.Email = getOrderFormData.email;
					dataToSend.Country = getOrderFormData.country;
					dataToSend.Phone = getOrderFormData.phone;
					dataToSend.Street = getOrderFormData.street;
					dataToSend.City = getOrderFormData.city;
					dataToSend.Zip = getOrderFormData.zipCode;
				}
				// Function to send payment data
				const firstResponse = await customFetch.post('/orders/paymentgw', {
					data: dataToSend,
				});
				console.log('First response data: ', firstResponse);
				// Set formData with firstResponse.data

				setFormData(firstResponse.data);

				// //After setting formData, make the second POST request to create the order
				const secondResponse = await customFetch.post('/orders', {
					orderData: firstResponse.data, // Pass formData to create the order
					cartItems: cartItems,
					shipping_fee: shipping_fee,
				});
				console.log(console.log('second response data: ', secondResponse));
			} catch (error) {
				console.error('Error making payment or creating order:', error);
			} finally {
				// Set isLoading to false after the operation is done (whether it succeeded or failed)
				setIsLoading(false);
			}
		};
		// Call the function when the component mounts
		fetchData();
	}, []); // The empty array [] ensures this effect runs only once on mount

	if (isLoading) {
		return <Spinner />;
	}

	const handleSubmit = () => {
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = 'https://test.24-pay.eu/pay_gate/paygt';

		for (const key in formData) {
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = key;
			input.value = formData[key];
			form.appendChild(input);
		}

		document.body.appendChild(form);
		form.submit();
	};

	return (
		<Wrapper>
			<CartHero cart title='Pay' />

			<Container className='section section-center'>
				<Row>
					<Col lg='12'>
						<Wrapper className=''>
							<div className='empty'>
								<h2>Payment gateway</h2>
								{/* Check if data is not empty before rendering the button */}
								{formData && <button onClick={handleSubmit}>Zaplat</button>}
							</div>
						</Wrapper>
					</Col>
				</Row>
				<Row>
					<Col xs='12'>
						<div className='link-container'>
							<Link to='/cart/review' className='link-btn'>
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
