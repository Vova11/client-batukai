import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { CartHero, OrderButtons } from './'
import Spinner from '../components/Dashboard/Spinner.js'
import Wrapper from '../assets/wrappers/Info'
import { useDispatch } from 'react-redux';
import { setRoute } from '../features/navigation/navigationSlice';
import { useNavigate } from 'react-router-dom'

const WidgetSps = () => {
  const existingOrderForm = JSON.parse(localStorage.getItem('orderForm')) || {} // Get existing orderForm or initialize as an empty object if not present
  // Inside your component function
  const dispatch = useDispatch();
  const address = `${existingOrderForm.street}, ${existingOrderForm.city}, ${existingOrderForm.zipCode}`
  const [shippingInfo, setShippingInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    // Load map and related functionality here
    const script = document.createElement('script')
    script.src = `https://balikomat.sps-sro.sk/openstreetmap/csv_to_google_map_location.php?address=${address}&country=SK`

    // Define a callback function to be called when the script is loaded

    script.onload = () => {
      setIsLoading(false)
      // The external script has loaded, you can now use its functionality
      window.FillBoxMachine3 = (pp) => {
        console.log(pp)
        setShippingInfo(pp)
      }
    }

    document.body.appendChild(script)

    // Cleanup: remove the script element when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {address, description, city, countryISO, zip} = shippingInfo;
    const updatedOrderForm = {
      ...existingOrderForm, // Copy existing data
      delivery: {
        name: description,
        description,
        address, 
        city, 
        zip,
        countryISO, 
        
      }, // Attach the 'delivery' object
    }
    
    // Store the updated 'orderForm' object back in localStorage
    localStorage.setItem('orderForm', JSON.stringify(updatedOrderForm))
    // dispatch(setRoute('/cart/review'));
    navigate('/cart/review')
  }

  return (
    <>
      <CartHero cart title='Delivery - SPS' />
      <Container className='section section-center'>
        <Row>
          <Col xs='12' lg='6'>
            <div id='osmMap' style={{ width: '100%', height: '500px' }}></div>
             {shippingInfo && Object.keys(shippingInfo).length > 1 && (
            <form hidden>
              <input
                type='text'
                id='Name'
                value={shippingInfo.id}
                placeholder='ID'
              />
              <input
                type='text'
                id='Description'
                value={shippingInfo.description}
                placeholder='Description'
              />
              <input
                type='text'
                id='PSC'
                placeholder='PSC'
                value={shippingInfo.description}
              />
              <input
                type='text'
                id='Address'
                placeholder='Address'
                value={shippingInfo.address}
              />
              <input
                type='text'
                id='City'
                placeholder='City'
                value={shippingInfo.city}
              />
              <input
                type='text'
                id='Country'
                placeholder='Country'
                value={shippingInfo.countryISO}
              />
              <input
                type='text'
                id='DropOff'
                placeholder='DropOff'
                value={shippingInfo.dropOffCapability}
              />
              <input
                type='text'
                id='DropOff'
                placeholder='DropOff'
                value={shippingInfo.cod}
              />
              <input
                type='text'
                id='DropOff'
                placeholder='DropOff'
                value={shippingInfo.type}
              />
              <input
                type='text'
                id='RequiredPhoneNumber'
                placeholder='RequiredPhoneNumber'
                value={shippingInfo.requiredPhoneNumber}
              />
            </form> )}
          </Col>
          <Col lg='6'>
            <h2>
              {Object.keys(shippingInfo).length > 1
                ? 'Odberné miesto'
                : 'Vyberte odberné miesto'}
            </h2>
            {shippingInfo && Object.keys(shippingInfo).length > 1 && (
              <Wrapper>
                <p className='info-row'>
                  <strong>Odberné miesto:</strong>{' '}
                  <span>{shippingInfo.description}</span>
                </p>
                <p className='info-row'>
                  <strong>Adresa:</strong> <span>{shippingInfo.address}</span>
                </p>
                <p className='info-row'>
                  <strong>Mesto:</strong> <span>{shippingInfo.city}</span>
                </p>
                <p className='info-row'>
                  <strong>Kod krajiny:</strong>
                  <span>{shippingInfo.countryISO}</span>
                </p>
                <p className='info-row'>
                  <strong>Zip:</strong> <span>{shippingInfo.zip}</span>
                </p>
                {/*  <p id='OpeningHoursContainer'></p> */}
                <img
                  id='Photo'
                  alt='Product Photo'
                  className='pickUpPlaceImage'
                  src={shippingInfo.photoUrl}
                />
              </Wrapper>
            )}
          </Col>
        </Row>
        {Object.keys(shippingInfo).length > 1 && (
          <Row>
            <OrderButtons
              onSubmit={handleSubmit} // Pass the submit handler as a prop
              goBack={'/cart/checkout'}
            />
          </Row>
        )}
      </Container>
    </>
  )
}

export default WidgetSps
