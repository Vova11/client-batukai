import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	Home,
	Login,
	Register,
	ProtectedRoute,
	ResetPassword,
	ErrorPage,
	About,
	Products,
	Product,
	VerifyPage,
	SharedLayout,
} from './pages';
import {
	Dashboard,
	ProductPage,
	ProductsPage,
	AddProductPage,
	Stats,
	Profile,
	SharedLayout as Layout,
} from './components/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/user/userSlice';

function App() {
	const dispatch = useDispatch();
	const { isLoading, user } = useSelector((store) => store.user);

	useEffect(() => {
		if (!user) {
			dispatch(fetchUser());
		}
	}, [dispatch, user]);

	// console.log('App.js ', user);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='products' element={<Products />} />
					<Route path='products/:productId' element={<Product />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/user/verify-email' element={<VerifyPage />} />
					<Route path='/user/reset-password' element={<ResetPassword />} />
				</Route>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute isLoading={isLoading} user={user}>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path='all-products' element={<ProductsPage />} />
					<Route path='products/:productId' element={<ProductPage />} />
					<Route path='add-product' element={<AddProductPage />} />
					<Route path='stats' element={<Stats />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
