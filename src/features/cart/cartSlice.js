import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.items.push({ ...action.payload });
		},

		// increment: (state, action) => {
		// 	// const { productId, size } = action.payload;
		// 	// const item = state.items.find(
		// 	// 	(item) => item.productId === productId && item.size === size
		// 	// );
		// 	// if (item) {
		// 	// 	item.quantity += 1;
		// 	// }
		// },
		// decrement: (state, action) => {
		// 	const { productId, size } = action.payload;
		// 	const item = state.items.find(
		// 		(item) => item.productId === productId && item.size === size
		// 	);

		// 	if (item && item.quantity > 1) {
		// 		item.quantity -= 1;
		// 	}
		// },
		setQuantityToOne: (state) => {
			state.quantity = 1;
		},
	},
});

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	increment,
	decrement,
	setQuantityToOne,
} = cartSlice.actions;

export default cartSlice.reducer;
