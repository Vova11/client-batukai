import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	Home,
	Login,
	Register,
	ProtectedRoute,
	About,
	Products,
	Cart,
	SharedLayout,
	ResetPassword,
	VerifyPage,
	ForgotPassword,
	ErrorPage,
	SingleProduct,
	CartCheckout,
	CartReviewOrder,
	Payment,
	CartContainer,
	Rurl,
	Nurl,
	Brands,
	WidgetSps,
	WidgetPacketa,
  BrandProducts,
  Contact,
  ContactForm
} from './pages';
import {
	Dashboard,
	ProductPage,
	ProductsPage,
	AddProductPage,
	Stats,
	Profile,
	SharedLayout as Layout,
	Orders,
	OrderDetail,
  PdfViewer,
  Brands as BrandsAdmin,
  BrandPage,
} from './components/Dashboard';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='products' element={<Products />} />
          
					{/* Start CART */}
					<Route path='/cart' element={<CartContainer />}>
						<Route index element={<Cart />} />
						<Route path='checkout' element={<CartCheckout />} />
						<Route path='review' element={<CartReviewOrder />} />
						<Route path='sps' element={<WidgetSps />} />
						<Route path='packeta' element={<WidgetPacketa />} />
						<Route path='pay' element={<Payment />} />
					</Route>
					{/* End CART */}
					<Route path='/brands' element={<Brands />} />
          <Route path='/brands/:brandName' element={<BrandProducts />} />
					{/* Start Payment gateway routes */}
					<Route path='/thankyou' element={<Rurl />} />
					<Route path='/nurl' element={<Nurl />} />
					{/* End Payment gateway routes */}
					<Route path='products/:productId' element={<SingleProduct />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/user/verify-email' element={<VerifyPage />} />
					<Route path='/user/forgot-password' element={<ForgotPassword />} />
					<Route path='/user/reset-password' element={<ResetPassword />} />
          <Route path='contact' element={<Contact />} />
          <Route path='contact-form' element={<ContactForm />} />
				</Route>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
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
					<Route path='orders' element={<Orders />} />
          <Route path='brands' element={<BrandsAdmin />} />
          <Route path='brands/:id' element={<BrandPage />} />
          <Route path='orders/:id' element={<OrderDetail />} />
          <Route path="print-label/:pdfId" element={<PdfViewer />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
