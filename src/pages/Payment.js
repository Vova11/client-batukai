import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHero from './PageHero';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import customFetch from '../utils/axios';

const Payment = () => {
	const navigate = useNavigate();
	// Read data from local storage
	const orderFormData = JSON.parse(localStorage.getItem('orderForm'));
	const cartData = JSON.parse(localStorage.getItem('cart'));
	const [htmlContent, setHtmlContent] = useState();

	const handlePaymentClick = async () => {
		try {
			const response = await customFetch.post('/orders/pay', {
				// Place your payment data here
				data: {
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
					RURL: 'http://mojobchod.sk/rurl',
					NURL: 'http://mojobchod.sk/nurl',
					Phone: '+421334555',
					Street: 'Kalov',
					City: 'Žilina',
					Zip: '01001',
					RedirectSign: false,
					Debug: 'false',
					NotifyClient: 'vladimir.zembera@gmail.com',
					NotifyEmail: 'vladimir.zembera@gmail.com',
					RedirectSign: false,
				},
			});
			const newWindow = window.open();
			newWindow.document.write(response.data);
			//------- OLD CODE ---- //
			// setHtmlContent(response.data);
			// window.location.href = response.data.url;
			// console.log(response);
			//------- OLD CODE ---- //
			// const newTab = window.open();
			// newTab.document.write(response.data);
			// Replace the current page content with the received HTML
			// document.documentElement.innerHTML = response.data;
			// console.log('Payment response:', response);
			// Redirect the user to the payment gateway's URL
			// Redirect the user to the payment gateway's URL

			// console.log('Payment response:', response);
			// Once you have the sign key, construct the payment gateway URL
			// if (response.status === 200) {
			// 	const paymentGatewayUrl = `https://test.24-pay.eu/pay_gate/paygt`;
			// 	// Redirect the user to the payment gateway URL
			// 	window.location.href = paymentGatewayUrl;
			// }
		} catch (error) {
			console.error('Error making payment:', error);
		}
	};

	const handleRedirect = async () => {
		console.log('redirecting');
		try {
			// Send a GET request to the Express backend
			await axios.get(
				`${process.env.REACT_APP_BASE_URL}/redirect-to-wikipedia`
			);
			console.log('Redirecting to Wikipedia...');
		} catch (error) {
			console.error('Error redirecting:', error);
		}
	};

	return (
		<Wrapper>
			<PageHero title='Pay' />

			<Container className='section section-center'>
				<Row>
					<Col lg='12'>
						<Wrapper className=''>
							<div className='empty'>
								<h2>Payment gateway</h2>
								<button onClick={handlePaymentClick}>Make Payment</button>
								<button onClick={handleRedirect}>Redirect me</button>
								<div>
									{/* Render the received HTML content inside an iframe */}
									{htmlContent && (
										<iframe
											title='Payment Response'
											srcDoc={htmlContent} // Set the received HTML content here
											style={{ width: '100%', height: '500px' }}
										></iframe>
									)}
								</div>
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
