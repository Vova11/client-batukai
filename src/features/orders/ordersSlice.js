// orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { saveAs } from 'file-saver';
import {
	getAllOrdersThunk,
	deleteOrderThunk,
	showOrderThunk,
} from './ordersThunk';
import { toast } from 'react-toastify';
const initialState = {
	isLoading: true,
	totalOrders: 0,
	orders: [], // Initial state for orders
	orderDetail: null, // Property to hold the fetched order detail
	invoiceURL: null,
	error: null,
};

export const getAllOrders = createAsyncThunk(
	'allOrders/getOrders',
	getAllOrdersThunk
);

export const deleteOrder = createAsyncThunk(
	'order/deleteOrder',
	deleteOrderThunk
);

export const showOrder = createAsyncThunk('order/showOrder', showOrderThunk);

const ordersSlice = createSlice({
	name: 'allOrders',
	initialState,
	reducers: {
		deleteOrderFromOrdersState: (state, action) => {
			// Remove the deleted order from the orders array
			state.orders = state.orders.filter(
				(order) => order.id !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOrders.pending, (state) => {
				state.isLoading = true;
				console.log(state);
			})
			.addCase(getAllOrders.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const { count, rows } = payload.orders;
				state.totalOrders = count;
				state.orders = rows;
			})
			.addCase(getAllOrders.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(deleteOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteOrder.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				console.log(payload);
				toast.success(payload);
			})
			.addCase(deleteOrder.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload.data.message);
			})
			.addCase(showOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showOrder.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.orderDetail = payload;
			})
			.addCase(showOrder.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			});
	},
});
export const { deleteOrderFromOrdersState } = ordersSlice.actions;
export default ordersSlice.reducer;
