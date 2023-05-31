import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	Home,
	Login,
	ProtectedRoute,
	ErrorPage,
	About,
	Products,
	Product,
	SharedLayout,
} from './pages';
import {
	Dashboard,
	Order,
	Orders,
	ProductPage,
	ProductsPage,
	Stats,
	AddProductPage,
} from './components/Dashboard';
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
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='products' element={<Products />} />
					<Route path='products/:productId' element={<Product />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>
				<Route
					path='/admin'
					element={
						<ProtectedRoute user={user} isLoading={isLoading}>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path='products' element={<ProductsPage />} />
					<Route path='products/:productId' element={<ProductPage />} />
					<Route path='add-product' element={<AddProductPage />} />
					<Route path='orders' element={<Order />} />
					<Route path='stats' element={<Stats />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>

				<Route path='/login' element={<Login />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
