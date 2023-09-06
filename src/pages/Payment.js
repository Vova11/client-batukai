import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CartHero } from './';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import customFetch from '../utils/axios';

import Spinner from '../components/Dashboard/Spinner';

const Payment = () => {
	const [formData, setFormData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const data = {
		Mid: 'demoOMED',
		EshopId: '11111111',
		MsTxnId: Math.floor(Math.random() * 10000),
		Amount: '10.50',
		CurrAlphaCode: 'EUR',
		ClientId: '110',
		FirstName: 'Test',
		FamilyName: 'Payment',
		Email: 'test@test.sk',
		Country: 'SVK',
		Timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
		Sign: '',
		LangCode: 'sk',
		RURL: `${process.env.REACT_APP_CLIENT_URL}/thankyou}`,
		NURL: `${process.env.REACT_APP_CLIENT_URL}/nurl}`,
		Phone: '+421334555',
		Street: 'Kalov',
		City: 'Žilina',
		Zip: '01001',
		RedirectSign: false,
		Debug: true,
		NotifyClient: 'vladimir.zembera@gmail.com',
		NotifyEmail: 'vladimir.zembera@gmail.com',
		RedirectSign: false,
	};

	useEffect(() => {
		setIsLoading(true);
		// Function to send payment data
		const sendPaymentData = async () => {
			try {
				const response = await customFetch.post('/orders/paymentgw', {
					data: data,
				});

				setFormData(response.data);
			} catch (error) {
				console.error('Error making payment:', error);
			} finally {
				// Set isLoading to false after the operation is done (whether it succeeded or failed)
				setIsLoading(false);
			}
		};

		// Call the function when the component mounts
		sendPaymentData();
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
								{formData && (
									<button onClick={handleSubmit}>Submit Payment</button>
								)}
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

// import React, { Fragment, useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import PageHero from './PageHero';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import customFetch from '../utils/axios';

// const Payment = () => {
// 	const navigate = useNavigate();
// 	// Read data from local storage
// 	const orderFormData = JSON.parse(localStorage.getItem('orderForm'));
// 	const cartData = JSON.parse(localStorage.getItem('cart'));

// 	const [response, setResponse] = useState(null);
// 	const [htmlContent, setHtmlContent] = useState('');

// 	const handleLoadPayment = async () => {
// 		try {
// 			const response = await customFetch.post('/orders/pay', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					// your data to send
// 				}),
// 			});

// 			if (response.status === 200) {
// 				setResponse(response);
// 				setHtmlContent(response.data.data);
// 			} else {
// 				console.log('Request failed:', response.statusText);
// 			}
// 		} catch (error) {
// 			console.log('Request error:', error);
// 		}
// 	};

// 	// console.log(response);
// 	console.log(htmlContent);

// 	return (
// 		<Wrapper>
// 			<PageHero title='Pay' />

// 			<Container className='section section-center'>
// 				<Row>
// 					<Col lg='12'>
// 						<Wrapper className=''>
// 							<div className='empty'>
// 								<h2>Payment gateway</h2>
// 								<button onClick={handleLoadPayment}>Load Payment</button>
// 								{response && (
// 									<div style={{ textAlign: 'left' }}>
// 										<h3>Status: {response.status}</h3>
// 										<pre>{JSON.stringify(response, null, 2)}</pre>
// 										<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
// 									</div>
// 								)}
// 							</div>
// 						</Wrapper>
// 					</Col>
// 				</Row>
// 				<Row>
// 					<Col xs='12'>
// 						<div className='link-container'>
// 							<Link to='/review' className='link-btn'>
// 								Go back
// 							</Link>
// 						</div>
// 					</Col>
// 				</Row>
// 			</Container>
// 		</Wrapper>
// 	);
// };

// export default Payment;

// const Wrapper = styled.section`
// 	.empty {
// 		text-align: center;
// 		h2 {
// 			margin-bottom: 1rem;
// 			text-transform: none;
// 		}
// 	}
// 	.link-container {
// 		display: flex;
// 		justify-content: space-between;
// 		margin-top: 2rem;
// 	}
// 	.link-btn {
// 		background: transparent;
// 		border-color: transparent;
// 		text-transform: capitalize;
// 		padding: 0.25rem 0.5rem;
// 		background: var(--clr-primary-5);
// 		color: var(--clr-white);
// 		border-radius: var(--radius);
// 		letter-spacing: var(--spacing);
// 		font-weight: 400;
// 		cursor: pointer;
// 	}
// 	.clear-btn {
// 		background: var(--clr-black);
// 	}
// `;
