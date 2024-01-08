// orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { saveAs } from 'file-saver'
import {
  getAllOrdersThunk,
  deleteOrderThunk,
  showOrderThunk,
  createOrderThunk,
  printPacketaShippingLabelThunk,
  printPacketaShippingLabelHDThunk,
  sendConfirmationEmailThunk,
  createInvoiceThunk,
  downloadInvoiceThunk,
} from './ordersThunk'
import { toast } from 'react-toastify'

const initialState = {
  isLoading: true,
  totalOrders: 0,
  orders: [], // Initial state for orders
  orderDetail: null, // Property to hold the fetched order detail
  invoiceURL: null,
  error: null,
  isSuccess: false,
}

export const getAllOrders = createAsyncThunk(
  'allOrders/getOrders',
  getAllOrdersThunk
)

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  deleteOrderThunk
)

export const createOrder = createAsyncThunk(
  'order/createOrder',
  createOrderThunk
)

export const printPacketaLabel = createAsyncThunk(
  'order/printPacketaShippingLabel',
  printPacketaShippingLabelThunk
)

export const printPacketaLabelHD = createAsyncThunk(
  'order/printPacketaShippingLabelHD',
  printPacketaShippingLabelHDThunk
)

export const showOrder = createAsyncThunk('order/showOrder', showOrderThunk)

export const sendConfirmationEmail = createAsyncThunk(
  'order/sendConfirmationEmail',
  sendConfirmationEmailThunk
)
export const createInvoice = createAsyncThunk(
  'order/createInvoice',
  createInvoiceThunk
)

export const downloadInvoice = createAsyncThunk(
  'order/downloadInvoice',
  downloadInvoiceThunk
)

const ordersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    deleteOrderFromOrdersState: (state, action) => {
      // Remove the deleted order from the orders array
      state.orders = state.orders.filter((order) => order.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true
        console.log(state)
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const { count, rows } = payload.orders
        state.totalOrders = count
        state.orders = rows
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success(payload)
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload.data.message)
      })
      .addCase(showOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.orderDetail = payload
      })
      .addCase(showOrder.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        toast.error(payload)
      })
      .addCase(printPacketaLabel.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(printPacketaLabel.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(printPacketaLabel.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        toast.error(payload)
      })
      .addCase(printPacketaLabelHD.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(printPacketaLabelHD.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(printPacketaLabelHD.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        toast.error(payload)
      })
      .addCase(sendConfirmationEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendConfirmationEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success(payload.msg)
      })
      .addCase(sendConfirmationEmail.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
        toast.error(`Error. ${payload.msg}`)
      })
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInvoice.fulfilled, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(createInvoice.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`Error. ${payload.msg}`)
      })
      .addCase(downloadInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(downloadInvoice.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success(`Success. Invoice PDF has been downloaded.`)
      })
      .addCase(downloadInvoice.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(`Could not download Invoice PDF.`)
      })
  },
})
export const { deleteOrderFromOrdersState } = ordersSlice.actions
export default ordersSlice.reducer
