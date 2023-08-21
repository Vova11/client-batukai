import { createSlice } from '@reduxjs/toolkit';

const getLocalStorage = () => {
	let cart = localStorage.getItem('cart');
	if (cart) {
		return JSON.parse(localStorage.getItem('cart'));
	} else {
		return [];
	}
};

export const clearCart = () => (dispatch) => {
	// Perform any async operations here if needed
	// Then dispatch the actual clearCart action
	dispatch(clearCartAction());
	dispatch(countCartTotal());
};

export const countCartTotal = () => (dispatch) => {
	// Perform any async operations here if needed
	// Then dispatch the actual clearCart action
	dispatch(countCartTotalAction());
};

export const removeItem = (id) => (dispatch) => {
	dispatch(removeItemAction(id));
	dispatch(countCartTotal());
};

export const toggleAmount = (payload) => (dispatch) => {
	dispatch(toggleAmountAction(payload));
	dispatch(countCartTotal());
};

const initialState = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 534,
};
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const {
				productId,
				name,
				colour: color,
				size,
				quantity: amount,
				stock,
				image,
				price,
			} = action.payload;
			const tempItem = state.cart.find((i) => i.id === productId + size);
			if (tempItem) {
				//if item is already in cart
				const tempCart = state.cart.map((cartItem) => {
					if (cartItem.id === productId + size) {
						let newAmount = cartItem.amount + amount;
						if (newAmount > cartItem.max) {
							newAmount = cartItem.max;
						}
						return { ...cartItem, amount: newAmount };
					} else {
						return cartItem;
					}
				});

				return { ...state, cart: tempCart };
			} else {
				const newItem = {
					id: productId + size,
					productId,
					name,
					color,
					amount,
					image,
					price,
					max: stock, //its stock
					stock,
					size,
				};
				return { ...state, cart: [...state.cart, newItem] };
			}
		},
		removeItemAction: (state, action) => {
			const itemId = action.payload;
			console.log('removeItem.....');
			const tempCart = state.cart.filter((item) => item.id !== itemId);
			// Update local storage
			localStorage.setItem('cart', JSON.stringify(tempCart));
			return { ...state, cart: tempCart };
		},
		toggleAmountAction: (state, action) => {
			const { id, value } = action.payload;
			const tempCart = state.cart.map((item) => {
				if (item.id === id) {
					console.log('itemId', item.id);
					console.log('ID', id);
					if (value === 'increase') {
						let newAmount = item.amount + 1;
						if (newAmount > item.max) {
							newAmount = item.max;
						}
						return { ...item, amount: newAmount };
					}
					if (value === 'decrease') {
						let newAmount = item.amount - 1;
						if (newAmount < 1) {
							newAmount = 1;
						}
						return { ...item, amount: newAmount };
					}
				} else {
					return item;
				}
			});
			localStorage.setItem('cart', JSON.stringify(tempCart));
			return { ...state, cart: tempCart };
		},
		setQuantityToOne: (state) => {
			return {
				...state,
				quantity: 1,
			};
		},
		countCartTotalAction: (state) => {
			const { total_items, total_amount } = state.cart.reduce(
				(total, cartItem) => {
					console.log(total);
					console.log(cartItem);
					const { amount, price } = cartItem;
					total.total_items += amount;
					total.total_amount += price * amount;
					return total;
				},
				{
					total_items: 0,
					total_amount: 0,
				}
			);
			return { ...state, total_items, total_amount };
		},
		clearCartAction: (state) => {
			console.log('clear cart');
			localStorage.setItem('cart', JSON.stringify([])); // Update the local storage
			return {
				...state,
				cart: [], // Update the Redux state
			};
		},
	},
});

export const {
	addToCart,
	setQuantityToOne,
	clearCartAction,
	removeItemAction,
	toggleAmountAction,
	countCartTotalAction,
} = cartSlice.actions;

export default cartSlice.reducer;
