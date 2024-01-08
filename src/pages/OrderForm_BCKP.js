import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updateShippingFee } from '../features/cart/cartSlice'

import OrderButtons from './OrderButtons'

const OrderForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { total_amount, shipping_fee } = useSelector((store) => store.cart)
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    phone: '',
    houseNumber: '',
    city: '',
    country: '',
    zipCode: '',
    isOver18: false, // Default value
    agreeWithConditions: false,
    shippingCompany: '',
    shippingMethod: '',
    shippingPrice: total_amount > process.env.REACT_APP_IF_TOTAL_IS_ABOVE ? 0 : 1.5, // Updated default value
    present: total_amount > process.env.REACT_APP_IF_TOTAL_IS_ABOVE ? true : false,
  }

  const [formData, setFormData] = useState(initialState)

  // Check localStorage on component mount
  useEffect(() => {
    const storedFormData = localStorage.getItem('orderForm')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      

      setFormData(parsedFormData)
      // Dispatch updateShippingFee based on total_amount
      dispatch(updateShippingFee(parsedFormData.shippingPrice))
      
    }
  }, [shipping_fee, total_amount, dispatch])

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  const handleShippingMethodChange = (event) => {
    const value = event.target.value
    let method
    let company

    switch (+value) {
      case 3:
      console.log('tu 3');  
      method = 'Packeta na adresu'
        company = 'Packeta1'
        break
      case 1.9:
        // Code to execute if expression matches value2
        console.log('tu 1.9');  
        method = 'Packeta na odberné miesto (Z-Box)'
        company = 'Packeta'
        break
      // Add more cases as needed
      case 1.5:
        console.log('tu 1.5');  
        // Code to execute if expression matches value2
        method = 'SPS na odberné miesto'
        company = 'SPS'
        break
      // Add more cases as needed
      default:
      // Code to execute if no cases match expression
    }
    dispatch(updateShippingFee(+value))
    setFormData({
      ...formData,
      shippingCompany: company,
      shippingMethod: method,
      shippingPrice: +value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.isOver18) {
      toast.error('Please confirm that you are above 18 years old')
      return
    }

    if (!formData.agreeWithConditions) {
      toast.error('Please agree to the conditions')
      return
    }
    console.log(formData)
    localStorage.setItem('orderForm', JSON.stringify(formData))
    if (formData.shippingCompany === 'SPS') {
      navigate('/cart/sps')
    } else if (formData.shippingCompany === 'Packeta1') {
      navigate('/cart/review')
    } else {
      navigate('/cart/packeta')
    }
  }

  return (
    <form>
      <div className='mb-3'>
        <label htmlFor='firstName' className='form-label'>
          First Name
        </label>
        <input
          type='text'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='lastName' className='form-label'>
          Last Name
        </label>
        <input
          type='text'
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='street' className='form-label'>
          Street
        </label>
        <input
          type='text'
          name='street'
          value={formData.street}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='houseNumber' className='form-label'>
          House Number
        </label>
        <input
          type='text'
          name='houseNumber'
          value={formData.houseNumber}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='city' className='form-label'>
          City
        </label>
        <input
          type='text'
          name='city'
          value={formData.city}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='zipCode' className='form-label'>
          Zip Code
        </label>
        <input
          type='text'
          name='zipCode'
          value={formData.zipCode}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='country' className='form-label'>
          Country
        </label>
        <input
          type='text'
          name='country'
          value={formData.country}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='phone' className='form-label'>
          Phone number
        </label>
        <input
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleInputChange}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label>Shipping:</label>
        <br />
        <label>
          <input
            type='radio'
            name='shippingCompany'
            value='3.00'
            checked={formData.shippingPrice === 3.0}
            onChange={handleShippingMethodChange}
          />
          {shipping_fee === 0
            ? 'Packeta na adresu - Zadarmo'
            : 'Packeta na adresu - 3,00 €'}
        </label>
        <br />
        <label>
          <input
            type='radio'
            name='shippingCompany'
            value='1.90'
            checked={formData.shippingPrice === 1.9}
            onChange={handleShippingMethodChange}
          />
          {shipping_fee === 0
            ? 'Packeta na odberné miesto (Z-Box) - Zadarmo'
            : 'Packeta na odberné miesto (Z-Box) 1,90 €'}
        </label>
        <br />
        <label>
          <input
            type='radio'
            name='shippingCompany'
            value='1.50'
            checked={formData.shippingPrice === 1.5}
            onChange={handleShippingMethodChange}
          />
          {shipping_fee === 0
            ? 'SPS na odberné miesto - Zadarmo'
            : 'SPS na odberné miesto - 1,50 €'}
        </label>
      </div>
      <div className='form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='agreeWithConditions'
          name='agreeWithConditions'
          checked={formData.agreeWithConditions}
          onChange={handleInputChange}
        />
        <label className='form-check-label' htmlFor='agreeWithConditions'>
          Vseobecne obchodne podmienky
        </label>
      </div>
      <div className='form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='isOver18'
          name='isOver18'
          checked={formData.isOver18}
          onChange={handleInputChange}
        />
        <label className='form-check-label' htmlFor='isOver18'>
          Starsi > 18
        </label>
      </div>
      <div>
        <div className='mb-3'>
          <input
            type='hidden'
            name='present'
            value={formData.present}
            onChange={handleInputChange}
            className='form-control'
            required
          />
        </div>
      </div>

      <OrderButtons
        onSubmit={handleSubmit} // Pass the submit handler as a prop
      />
    </form>
  )
}

export default OrderForm
