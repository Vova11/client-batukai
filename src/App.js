import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Landing, Login, ProtectedRoute, ErrorPage } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/user/userSlice';

function App() {
	const dispatch = useDispatch();
	const { isLoading, user } = useSelector((store) => store.user);

	useEffect(() => {
		if (user) {
			console.log('user is loaded', user);
		} else {
			console.log('user neni');
		}

		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute user={user} isLoading={isLoading}>
							<Dashboard user={user} />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
