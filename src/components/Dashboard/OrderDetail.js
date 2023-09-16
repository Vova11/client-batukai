import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showOrder } from '../../features/orders/ordersSlice.js';
import { saveAs } from 'file-saver';
import Spinner from './Spinner.js';
import customFetch from '../../utils/axios.js';

const OrderDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { isLoading, orderDetail } = useSelector((store) => store.orders);
	useEffect(() => {
		dispatch(showOrder(id));
	}, []);

	if (isLoading || loading) {
		return <Spinner />;
	}

	// // Check if orderDetail is null before destructuring its properties
	// const orderId = orderDetail?.id || '';

	const {
		id: orderId,
		firstName,
		lastName,
		email,
		phone,
		city,
		street,
		country,
		msTxnId,
		subtotal,
		total,
		shippingFee,
		createdAt,
		orderItems,
	} = orderDetail;

	const data = {
		id: orderId,
		firstName,
		lastName,
		email,
		phone,
		city,
		street,
		country,
		msTxnId,
		subtotal,
		total,
		shippingFee,
		createdAt,
		orderItems,
	};

	const generatePDF = async () => {
		setLoading(true);
		const res = await customFetch.post('/orders/create-pdf', data);
		console.log(res);
		setLoading(false);
	};

	const downloadPDF = async () => {
		setLoading(true);
		const invoiceFileName = id + data.msTxnId;
		//Use customFetch to request the PDF from the server

		const response = await customFetch.get(
			`/orders/fetch-pdf/${invoiceFileName}`,
			{
				responseType: 'blob', // Specify blob as the response type
			}
		);
		// Create a blob containing the PDF data
		const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
		// Use a library like `file-saver` to save the PDF as a file
		saveAs(pdfBlob, `invoice_${invoiceFileName}.pdf`);
		setLoading(false);
	};

	// console.log(orderDetail);
	const confirmOrder = async () => {
		try {
			// Make an API request to your Express server to send the confirmation email

			const res = await customFetch.post('/orders/send-confirmation-email', {
				name: id + data.msTxnId,
				//add another attributes
			});
			console.log(res);
			console.log('Confirmation email sent successfully');
		} catch (error) {
			console.error('Error sending confirmation email:', error);
		}
	};

	const renderOrderDetail = () => {
		return (
			<div>
				<h2>Order: #{orderDetail.id}</h2>
				<hr />
				<ul>
					{Object.entries(orderDetail).map(([key, value]) => (
						<li key={key}>
							<strong>{key}:</strong>{' '}
							{key === 'orderItems' ? (
								<ul>
									{value.map((item, index) => (
										<li key={index}>
											<strong>Item {index + 1}:</strong>
											<ul>
												{Object.entries(item).map(([itemKey, itemValue]) => (
													<li key={itemKey}>
														<strong>{itemKey}:</strong> {itemValue}
													</li>
												))}
											</ul>
										</li>
									))}
								</ul>
							) : (
								value
							)}
						</li>
					))}
				</ul>
				<div>
					<h1>Generate PDF</h1>
					<button onClick={generatePDF}>Generate PDF</button>
					<button onClick={downloadPDF}>Download PDF</button>
					<button onClick={confirmOrder}>Send invoice to customer</button>
				</div>
			</div>
		);
	};

	return (
		<div>{orderDetail ? renderOrderDetail() : <p>Order not found</p>}</div>
	);
};

export default OrderDetail;
