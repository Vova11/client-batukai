import customFetch from '../../utils/axios'
import { fetchBrands, fetchBrand } from './brandSlice'

export const fetchBrandsThunk = async (base64Image, thunkAPI) => {
  try {
    const response = await customFetch.get('/companies', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const fetchBrandThunk = async (id, thunkAPI) => {
  try {
    const response = await customFetch.get(`/companies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const uploadSingleImageThunk = async ({image, id, modelName}, thunkAPI) => {
  try {
    const response = await customFetch.post(
      '/products/uploadImage',
      {
        image,
        id,
        modelName
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

// Function to update company name by ID
export const updateBrandThunk = async ({ id, data }, thunkAPI) => {
  try {
    const response = await customFetch.post(`/companies/${id}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    // Dispatch fetchBrands after successfully updating the brand
    console.log('Loading all brands')
    thunkAPI.dispatch(fetchBrands()) // Dispatch fetchBrands action
    return response.data // If needed, return the response data
  } catch (error) {
    // console.log(error)
    // throw new Error('Failed to update company name'); // Handle the error as needed
    return thunkAPI.rejectWithValue(error.response.data)
  }
}

export const removeImageThunk = async ({id, publicId}, thunkAPI) => {
  console.log('removing image');
  console.log(id);
  console.log(publicId);
  try {
    const response = await customFetch.post(`/companies/${id}/removeImage`, {publicId}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    // Return the response data if needed
    return response.data
  } catch (error) {
    // Handle the error as needed
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
