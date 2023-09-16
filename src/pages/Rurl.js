import axios from 'axios';
import React, { useState, useEffect } from 'react';
import customFetch from '../utils/axios';
import { useSearchParams } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Dashboard/Spinner';
const Rurl = () => {
	const [queryParams, setQueryParams] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	setIsLoading(true);

	// 	const fetchData = async () => {
	// 		const onPageLoad = () => {
	// 			console.log('page loaded');

	// 			const searchParams = new URLSearchParams(window.location.search);
	// 			const params = {};
	// 			for (const [key, value] of searchParams) {
	// 				params[key] = value;
	// 			}

	// 			setQueryParams(params);
	// 			console.log('Params query: ', queryParams);

	// 			const loadData = async () => {
	// 				const data = {
	// 					msTxnId: queryParams.MsTxnId,
	// 					newStatus: queryParams.Result,
	// 				};
	// 				try {
	// 					const response = await customFetch.post(
	// 						'/orders/updateOrderStatus',
	// 						{
	// 							sup: queryParams.MsTxnId,
	// 							hell: '123',
	// 						}
	// 					);
	// 					console.log(response);
	// 				} catch (error) {
	// 					console.error('Error updating order status:', error);
	// 				} finally {
	// 					setIsLoading(false);
	// 				}
	// 			};

	// 			loadData(); // Call the loadData function
	// 		};

	// 		if (document.readyState === 'complete') {
	// 			onPageLoad();
	// 		} else {
	// 			window.addEventListener('load', onPageLoad, false);

	// 			return () => window.removeEventListener('load', onPageLoad);
	// 		}
	// 	};

	// 	fetchData();
	// }, []); // Ensure that this effect runs only once

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			const searchParams = new URLSearchParams(window.location.search);
			const params = {};
			for (const [key, value] of searchParams) {
				params[key] = value;
			}

			setQueryParams(params);
			console.log('Params query:', params);

			const data = {
				msTxnId: params.MsTxnId,
				newStatus: params.Result,
			};

			try {
				const response = await customFetch.post(
					'/orders/updateOrderStatus',
					data
				);
				if (response.data.msg === 'success') {
					// clear cart and local storage
					localStorage.removeItem('cartItems');
					localStorage.removeItem('orderForm');
					dispatch(clearCart());
				}
			} catch (error) {
				console.error('Error updating order status:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []); // Ensure that this effect runs only once

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			{queryParams.Result === 'OK' ? <h1>Thank you </h1> : ''}
			{queryParams.Result === 'FAIL' ? <h1>Platba nebola uspesna</h1> : ''}
			{queryParams.Result === 'PENDING' ? (
				<h1>Platba caka na schvalenie</h1>
			) : (
				''
			)}
		</div>
	);
};

export default Rurl;
