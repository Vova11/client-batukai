import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updateShippingFee } from '../features/cart/cartSlice'
import { countries } from '../utils/helpers'
import OrderButtons from './OrderButtons'

const OrderForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shipping_fee, present } = useSelector((store) => store.cart)
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
    shippingPrice: shipping_fee,
    present: present,
    deliveryType: '',
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    // Check localStorage on component mount
    const storedFormData = localStorage.getItem('orderForm')
    if (storedFormData) {
      const updatedFormData = JSON.parse(storedFormData)
      setFormData(updatedFormData)
    }
  }, [])

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
    let deliveryType

    switch (+value) {
      case 3:
        method = 'Packeta na adresu'
        company = 'Packeta'
        deliveryType = 'HD'
        break
      case 1.9:
        // Code to execute if expression matches value2
        method = 'Packeta na odberné miesto (Z-Box)'
        company = 'Packeta'
        deliveryType = 'PP/BOX'
        break
      // Add more cases as needed
      case 1.5:
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
      deliveryType,
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

    // Create an updatedOrderForm by copying the formData and resetting delivery properties to null
    const updatedOrderForm = {
      ...formData,
      delivery: {
        name: null,
        description: null,
        address: null,
        city: null,
        zip: null,
        countryISO: null,
      },
    }

    // Store the updatedOrderForm in local storage
    localStorage.setItem('orderForm', JSON.stringify(updatedOrderForm))

    if (updatedOrderForm.shippingCompany === 'SPS') {
      navigate('/cart/sps')
    } else if (updatedOrderForm.deliveryType === 'HD') {
      // Remove the 'packeta' from local storage
      localStorage.removeItem('packeta')
      navigate('/cart/review')
    } else {
      navigate('/cart/packeta')
    }
  }
  console.log(countries)
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
        <select
          name='country'
          value={formData.country}
          onChange={handleInputChange}
          className='form-select'
          required
        >
          <option value=''>Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
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
            defaultChecked
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
        goBack={'/cart'}
      />
    </form>
  )
}

export default OrderForm
