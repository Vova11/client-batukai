import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import productSlice from './features/product/productSlice';
import allProductsSlice from './features/allProducts/allProductsSlice';
import cartSlice from './features/cart/cartSlice';
import filterSlice from './features/filter/filterSlice';
import ordersSlice from './features/orders/ordersSlice'; // Import your order slice
export const store = configureStore({
	reducer: {
		user: userSlice,
		products: allProductsSlice,
		product: productSlice,
		cart: cartSlice,
		filter: filterSlice,
		orders: ordersSlice,
	},
});
