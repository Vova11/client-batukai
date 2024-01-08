import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import {
  uploadSingleImageThunk,
  removeImageThunk,
  fetchBrandsThunk,
  fetchBrandThunk,
  updateBrandThunk,
} from './brandThunk'

const initialState = {
  isLoading: false,
  name: '',
  images: [],
  count: 0,
  brands: [],
  brand: null,
}

export const fetchBrands = createAsyncThunk(
  'brand/fetchBrands',
  fetchBrandsThunk
)
export const fetchBrand = createAsyncThunk('brand/fetchBrand', fetchBrandThunk)

export const uploadSingleImage = createAsyncThunk(
  'brand/uploadImage',
  uploadSingleImageThunk
)

export const removeImage = createAsyncThunk(
  'brand/removeImage',
  removeImageThunk
)

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  updateBrandThunk
)

const productSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    updateBrandData: (state, action) => {
      const { name } = action.payload
      return {
        ...state,
        brand: {
          ...state.brand,
          name: name, // Update the brand name with the new value from the action payload
        },
      }
    },
    clearImages: (state) => {
      return {
        ...state,
        images: []
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        const { count, rows } = action.payload
        state.count = count
        state.brands = rows
        state.isLoading = false
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBrand.fulfilled, (state, { payload }) => {
        state.isLoading = false
        console.log(payload.status)
        toast.success(payload.msg)
      })
      .addCase(updateBrand.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload.msg)
      })
      .addCase(fetchBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBrand.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.brand = payload
      })
      .addCase(fetchBrand.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(uploadSingleImage.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(uploadSingleImage.fulfilled, (state, action) => {
        state.images.push(action.payload)
        state.isLoading = false
        toast.success('Image successfully uploaded')
      })
      .addCase(uploadSingleImage.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(removeImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeImage.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.images = []
        state.isLoading = false
        toast.success('Image removed')
      })
      .addCase(removeImage.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})
export const { updateBrandData, clearImages } = productSlice.actions
export default productSlice.reducer
