import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import productSlice from './features/product/productSlice';
import allProductsSlice from './features/allProducts/allProductsSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		products: allProductsSlice,
		product: productSlice,
	},
});
