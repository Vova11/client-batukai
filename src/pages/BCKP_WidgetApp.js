import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { CartHero } from './'
import Spinner from '../components/Dashboard/Spinner.js'
import OrderButtons from './OrderButtons'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

const WidgetSps = () => {
  const existingOrderForm = JSON.parse(localStorage.getItem('orderForm')) || {} // Get existing orderForm or initialize as an empty object if not present
  const navigate = useNavigate()
  const address = `${existingOrderForm.street}, ${existingOrderForm.city}, ${existingOrderForm.zipCode}`
  const [shippingInfo, setShippingInfo] = useState({})
  // Define FillBoxMachine3 function before useEffect
  const [photo, setPhoto] = useState(null) // Initialize pp as null
  const [isLoading, setIsLoading] = useState(false)

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
        const photoImage = document.getElementById('Photo')
        if (photoImage) {
          photoImage.src = pp.photoUrl
        }
      }
    }

    document.body.appendChild(script)

    // Cleanup: remove the script element when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedOrderForm = {
      ...existingOrderForm, // Copy existing data
      delivery: shippingInfo, // Attach the 'delivery' object
    }
    // Store the updated 'orderForm' object back in localStorage
    localStorage.setItem('orderForm', JSON.stringify(updatedOrderForm))
    navigate('/cart/review')
  }

  return (
    <>
      <CartHero cart title='Delivery - SPS' />
      <Container className='section section-center'>
        <Row>
          <Col xs='12' lg='6'>
            <div id='osmMap' style={{ width: '100%', height: '500px' }}></div>
            <form hidden>
              <input
                type='text'
                id='Name'
                value={shippingInfo.id}
                placeholder='ID'
                readonly
              />
              <input
                type='text'
                id='Description'
                value={shippingInfo.description}
                placeholder='Description'
                readonly
              />
              <input
                type='text'
                id='PSC'
                placeholder='PSC'
                value={shippingInfo.description}
                readonly
              />
              <input
                type='text'
                id='Address'
                placeholder='Address'
                value={shippingInfo.address}
                readonly
              />
              <input
                type='text'
                id='City'
                placeholder='City'
                value={shippingInfo.city}
                readonly
              />
              <input
                type='text'
                id='Country'
                placeholder='Country'
                value={shippingInfo.countryISO}
                readonly
              />
              <input
                type='text'
                id='DropOff'
                placeholder='DropOff'
                value={shippingInfo.dropOffCapability}
                readonly
              />
              <input
                type='text'
                id='DropOff'
                placeholder='DropOff'
                value={shippingInfo.cod}
                readonly
              />
              <input
                type='text'
                id='DropOff'
                placeholder='DropOff'
                value={shippingInfo.type}
                readonly
              />
              <input
                type='text'
                id='RequiredPhoneNumber'
                placeholder='RequiredPhoneNumber'
                value={shippingInfo.requiredPhoneNumber}
                readonly
              />
            </form>
          </Col>
          <Col lg='6'>
            <h2>
              {Object.keys(shippingInfo).length > 1
                ? 'Odberné miesto'
                : 'Vyberte odberné miesto'}
            </h2>
            {Object.keys(shippingInfo).length > 1 && (
              <Info>
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
                />
              </Info>
            )}
          </Col>
        </Row>
        <Row>
          <Col lg='12'>
            {Object.keys(shippingInfo).length > 1 ? (
              <OrderButtons
                onSubmit={handleSubmit} // Pass the submit handler as a prop
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default WidgetSps

const Info = styled.section`
  .info-row {
    display: flex;

    margin: 6px 0 6px 0;
  }
  strong {
    margin-right: 10px; /* Adjust spacing between strong and span elements */
    flex: 1; /* Allow the span to take up the remaining space */
  }
  span {
    /* Add any styles you want for the span elements */
    flex: 2; /* Adjust this value to control the space between strong and span */
  }
`


// import React, { useEffect, useState } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import { CartHero } from './'
// import Spinner from '../components/Dashboard/Spinner.js'
// import OrderButtons from './OrderButtons'
// import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'

// const WidgetSps = () => {
//   const existingOrderForm = JSON.parse(localStorage.getItem('orderForm')) || {} // Get existing orderForm or initialize as an empty object if not present
//   const navigate = useNavigate()
//   const address = `${existingOrderForm.street}, ${existingOrderForm.city}, ${existingOrderForm.zipCode}`
//   const [shippingInfo, setShippingInfo] = useState({})
//   // Define FillBoxMachine3 function before useEffect
//   const [photo, setPhoto] = useState(null) // Initialize pp as null
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     setIsLoading(true)
//     // Load map and related functionality here
//     const script = document.createElement('script')
//     script.src = `https://balikomat.sps-sro.sk/openstreetmap/csv_to_google_map_location.php?address=${address}&country=SK`

//     // Define a callback function to be called when the script is loaded

//     script.onload = () => {
//       setIsLoading(false)
//       // The external script has loaded, you can now use its functionality
//       window.FillBoxMachine3 = (pp) => {
//         console.log(pp)
//         setShippingInfo(pp)
//         const photoImage = document.getElementById('Photo')
//         if (photoImage) {
//           photoImage.src = pp.photoUrl
//         }
//       }
//     }

//     document.body.appendChild(script)

//     // Cleanup: remove the script element when the component unmounts
//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [])

//   if (isLoading) {
//     return <Spinner />
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const updatedOrderForm = {
//       ...existingOrderForm, // Copy existing data
//       delivery: shippingInfo, // Attach the 'delivery' object
//     }
//     // Store the updated 'orderForm' object back in localStorage
//     localStorage.setItem('orderForm', JSON.stringify(updatedOrderForm))
//     navigate('/cart/review')
//   }

//   return (
//     <>
//       <CartHero cart title='Delivery - SPS' />
//       <Container className='section section-center'>
//         <Row>
//           <Col xs='12' lg='6'>
//             <div id='osmMap' style={{ width: '100%', height: '500px' }}></div>
//             <form hidden>
//               <input
//                 type='text'
//                 id='Name'
//                 value={shippingInfo.id}
//                 placeholder='ID'
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='Description'
//                 value={shippingInfo.description}
//                 placeholder='Description'
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='PSC'
//                 placeholder='PSC'
//                 value={shippingInfo.description}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='Address'
//                 placeholder='Address'
//                 value={shippingInfo.address}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='City'
//                 placeholder='City'
//                 value={shippingInfo.city}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='Country'
//                 placeholder='Country'
//                 value={shippingInfo.countryISO}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='DropOff'
//                 placeholder='DropOff'
//                 value={shippingInfo.dropOffCapability}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='DropOff'
//                 placeholder='DropOff'
//                 value={shippingInfo.cod}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='DropOff'
//                 placeholder='DropOff'
//                 value={shippingInfo.type}
//                 readonly
//               />
//               <input
//                 type='text'
//                 id='RequiredPhoneNumber'
//                 placeholder='RequiredPhoneNumber'
//                 value={shippingInfo.requiredPhoneNumber}
//                 readonly
//               />
//             </form>
//           </Col>
//           <Col lg='6'>
//             <h2>
//               {Object.keys(shippingInfo).length > 1
//                 ? 'Odberné miesto'
//                 : 'Vyberte odberné miesto'}
//             </h2>
//             {Object.keys(shippingInfo).length > 1 && (
//               <Info>
//                 <p className='info-row'>
//                   <strong>Odberné miesto:</strong>{' '}
//                   <span>{shippingInfo.description}</span>
//                 </p>
//                 <p className='info-row'>
//                   <strong>Adresa:</strong> <span>{shippingInfo.address}</span>
//                 </p>
//                 <p className='info-row'>
//                   <strong>Mesto:</strong> <span>{shippingInfo.city}</span>
//                 </p>
//                 <p className='info-row'>
//                   <strong>Kod krajiny:</strong>
//                   <span>{shippingInfo.countryISO}</span>
//                 </p>
//                 <p className='info-row'>
//                   <strong>Zip:</strong> <span>{shippingInfo.zip}</span>
//                 </p>
//                 {/*  <p id='OpeningHoursContainer'></p> */}
//                 <img
//                   id='Photo'
//                   alt='Product Photo'
//                   className='pickUpPlaceImage'
//                 />
//               </Info>
//             )}
//           </Col>
//         </Row>
//         <Row>
//           <Col lg='12'>
//             {Object.keys(shippingInfo).length > 1 ? (
//               <OrderButtons
//                 onSubmit={handleSubmit} // Pass the submit handler as a prop
//               />
//             ) : null}
//           </Col>
//         </Row>
//       </Container>
//     </>
//   )
// }

// export default WidgetSps

// const Info = styled.section`
//   .info-row {
//     display: flex;

//     margin: 6px 0 6px 0;
//   }
//   strong {
//     margin-right: 10px; /* Adjust spacing between strong and span elements */
//     flex: 1; /* Allow the span to take up the remaining space */
//   }
//   span {
//     /* Add any styles you want for the span elements */
//     flex: 2; /* Adjust this value to control the space between strong and span */
//   }
// `
