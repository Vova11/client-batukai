import customFetch from '../../utils/axios'
import { saveAs } from 'file-saver'
export const getAllOrdersThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/orders')
    return response.data
  } catch (error) {
    console.log(error.message)
    return thunkAPI.rejectWithValue(error.message)
  }
}

export const deleteOrderThunk = async (orderId, thunkAPI) => {
  try {
    const response = await customFetch.delete(`orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    // Return the response data if needed
    return response.data.message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const showOrderThunk = async (orderId, thunkAPI) => {
  try {
    const response = await customFetch.get(`orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    // Return the response data if needed
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const createOrderThunk = async (data, thunkAPI) => {
  try {
    const response = await customFetch.post('/orders', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('Creatign order');
    // Return the response data if needed
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const printPacketaShippingLabelThunk = async (data, thunkAPI) => {
  try {
    const response = await customFetch.post(
      '/shipping/print-packeta-label',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    // Return the response data if needed
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const printPacketaShippingLabelHDThunk = async (data, thunkAPI) => {
  try {
    const response = await customFetch.post(
      '/shipping/print-packeta-label-hd',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const sendConfirmationEmailThunk = async (data, thunkAPI) => {
  try {
    const response = await customFetch.post(
      '/orders/send-confirmation-email',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    // Return the response data if needed
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
}

export const createInvoiceThunk = async (data, thunkAPI) => {
  try {
    const response = await customFetch.post('/orders/create-invoice', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
}

export const downloadInvoiceThunk = async (data, thunkAPI) => {
  try {
    const { id, msTxnId } = data
    const invoiceFileName = id + msTxnId
    const response = await customFetch.get(
      `/orders/download-invoice/${invoiceFileName}`,
      {
        responseType: 'blob',
      }
    )

    const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
    saveAs(pdfBlob, `invoice_${invoiceFileName}.pdf`)
    return response
  } catch (error) {
    console.log(error)
    console.log(error.message)
    throw error // Throw the error to trigger the rejected state
  }
}
