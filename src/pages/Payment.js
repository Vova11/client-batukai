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
	const [redirectUrl, setRedirectUrl] = useState('');
	const [data, setData] = useState();

	const handleRedirect = (url) => {
		window.location.href = url;
	};

	const handlePaymentClick = async () => {
		try {
			const res = await customFetch.post('/orders/pay', {
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
					Debug: true,
					NotifyClient: 'vladimir.zembera@gmail.com',
					NotifyEmail: 'vladimir.zembera@gmail.com',
					RedirectSign: false,
				},
			});

			console.log(res);
			// console.log('send..');
			// console.log(res);
			// fetch('https://test.24-pay.eu/pay_gate/paygt', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/x-www-form-urlencoded',
			// 	},
			// 	body: JSON.stringify(res.data),
			// })
			// 	.then((success) => console.log(success))
			// 	.catch((err) => console.log(err));
			// console.log(res);
			// window.open('https://test.24-pay.eu/pay_gate/paygt');
			// setHtmlContent(res.data.resData);

			// const htmlContent = res.data;
			// const newWindow = window.open(
			// 	'https://test.24-pay.eu/pay_gate/paygt',
			// 	'_blank'
			// );
			// newWindow.document.write(htmlContent);

			// const htmlContent = res.data; // Replace this with your HTML content
			// const newWindow = window.open(
			// 	'https://test.24-pay.eu/pay_gate/paygt',
			// 	'_blank'
			// );

			// // Check if the new window has finished loading
			// newWindow.onload = function () {
			// 	// Add your HTML content to the new window's document
			// 	newWindow.document.body.innerHTML = htmlContent;
			// };

			// Perform the second post request

			// const redirectUrl = `https://admin.24-pay.eu/pay_gate/paygt?${new URLSearchParams(
			// 	res.data
			// ).toString()}`;
			// window.location.href = redirectUrl;

			// The condition to render the button depends on the data

			// const newWindow = window.open('', '_blank');
			// newWindow.document.write(res.data);

			// Perform the second post request

			// window.open(res.data.url, '_self');

			// // Get the response URL from the axios response
			// const redirectUrl = response.request.res.responseUrl;
			// // Open a new window to the response URL
			// window.open(redirectUrl, '_blank');

			// Open a new window to the response URL
		} catch (error) {
			console.error('Error making payment:', error);
		}
	};

	// const handleRedirect = async () => {
	// 	console.log('redirect.....');
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASE_URL}/redirect`
	// 		);

	// 		window.open(response.data.url, '_self');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<Wrapper>
			<PageHero title='Pay' />

			<Container className='section section-center'>
				<Row>
					<Col lg='12'>
						<Wrapper className=''>
							<div className='empty'>
								<h2>Payment gateway</h2>

								<button onClick={handleRedirect}>Redirect</button>

								<button onClick={handlePaymentClick}>Initiate Payment</button>
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
