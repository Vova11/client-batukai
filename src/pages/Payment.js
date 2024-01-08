import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { CartHero } from './'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import customFetch from '../utils/axios'
import Spinner from '../components/Dashboard/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../features/orders/ordersSlice'
import { getCountryCode } from '../utils/helpers'
import { toast } from 'react-toastify'
import pay24 from '../assets/images/24-pay-logo-white-bg.png'
import Button from 'react-bootstrap/Button'

const Payment = () => {
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { shipping_fee, total_amount, present } = useSelector(
    (store) => store.cart
  )

  const getOrderFormData = JSON.parse(localStorage.getItem('orderForm'))
  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Define dataToSend with default values
        const dataToSend = {
          MsTxnId: Math.floor(Math.random() * 10000),
          Amount: shipping_fee + total_amount,
          CurrAlphaCode: 'EUR',
          ClientId: '110',
          FirstName: getOrderFormData?.firstName,
          FamilyName: getOrderFormData?.lastName,
          Email: getOrderFormData?.email,
          Country: getCountryCode(getOrderFormData.country, 'codeForPaymentGateway'),
          Timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          LangCode: 'sk',
          RURL: 'https://www.sweetvape.eu/thankyou',
          NURL: 'https://www.sweetvape.eu/nurl',
          Phone: getOrderFormData?.phone,
          Street: getOrderFormData?.street,
          City: getOrderFormData?.city,
          Zip: getOrderFormData?.zipCode,
          RedirectSign: false,
          Debug: process.env.NODE_ENV === 'development' ? true : false,
          NotifyClient: 'vladimir.zembera@gmail.com',
          NotifyEmail: 'vladimir.zembera@gmail.com',
          zipCode: getOrderFormData?.zipCode,
          houseNumber: getOrderFormData?.houseNumber,
        }

        // Function to send payment data
        const firstResponse = await customFetch.post('/orders/paymentgw', {
          data: dataToSend,
        })

        setFormData(firstResponse.data.data)

        // CREATE THE ORDER
        const deliveryData = {
          ...getOrderFormData.delivery,
          shippingCompany: getOrderFormData.shippingCompany,
          shippingMethod: getOrderFormData.shippingMethod,
          deliveryType: getOrderFormData.deliveryType,
        }

        dispatch(
          createOrder({
            orderData: firstResponse.data.data, // Pass formData to create the order
            cartItems,
            shipping_fee,
            deliveryData,
          })
        )
      } catch (error) {
        console.log(error)
        console.error('Error making payment or creating order:', error)
        console.log(error.response.data.msg)
        toast.error('Sorry, something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    // Call the function when the component mounts
    fetchData()
  }, []) // The empty array [] ensures this effect runs only once on mount

  const handleSubmit = () => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://test.24-pay.eu/pay_gate/paygt'

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = formData[key]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    
    form.submit()
    setClicked(true)
    // Update the state to show the text after clicking
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Wrapper>
      <CartHero cart title='Pay' />

      <Container className='section section-center'>
        <Row>
          <Col lg='12'>
            <Wrapper className=''>
              <div className='empty'>
                {formData && !clicked ? (
                  <div>
                    <Button variant='primary' onClick={handleSubmit}>Prejsť k platbe</Button>
                    <Link to='/cart/review' className='btn margin-left-5'>
                      Go back
                    </Link>
                  </div>
                ) : (
                  <h2>Budete presmeovaný na platobnú bránu 24pay...</h2>
                )}
              </div>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Payment

const Wrapper = styled.section`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`

//   .link-container {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 2rem;
//   }
//   .link-btn {
//     background: transparent;
//     border-color: transparent;
//     text-transform: capitalize;
//     padding: 0.25rem 0.5rem;
//     background: var(--clr-primary-5);
//     color: var(--clr-white);
//     border-radius: var(--radius);
//     letter-spacing: var(--spacing);
//     font-weight: 400;
//     cursor: pointer;
//   }
//   .clear-btn {
//     background: var(--clr-black);
//   }
// import React, { useState, useEffect } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import { CartHero } from './'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom'
// import customFetch from '../utils/axios'
// import Spinner from '../components/Dashboard/Spinner'
// import { useSelector, useDispatch } from 'react-redux'
// import { createOrder } from '../features/orders/ordersSlice'

// const Payment = () => {
//   const [formData, setFormData] = useState()
//   const [isLoading, setIsLoading] = useState(false)
//   const { shipping_fee, total_amount, present } = useSelector(
//     (store) => store.cart
//   )
//   const getOrderFormData = JSON.parse(localStorage.getItem('orderForm'))
//   const cartItems = JSON.parse(localStorage.getItem('cartItems'))
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         // Define dataToSend with default values
//         const dataToSend = {
//           Mid: 'demoOMED',
//           EshopId: '11111111',
//           MsTxnId: Math.floor(Math.random() * 10000),
//           Amount: shipping_fee + total_amount,
//           CurrAlphaCode: 'EUR',
//           ClientId: '110',
//           FirstName: '',
//           FamilyName: '',
//           Email: '',
//           Country: '',
//           Timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
//           Sign: '',
//           LangCode: 'sk',
//           RURL: 'https://www.sweetvape.eu/thankyou',
//           NURL: 'https://www.sweetvape.eu/nurl',
//           Phone: '',
//           Street: '',
//           City: '',
//           Zip: '',
//           RedirectSign: false,
//           Debug: true,
//           NotifyClient: 'vladimir.zembera@gmail.com',
//           NotifyEmail: 'vladimir.zembera@gmail.com',
//           zipCode: getOrderFormData.zipCode,
//           houseNumber: getOrderFormData.houseNumber
//         }
//         if (getOrderFormData) {
//           // Populate dataToSend with getOrderFormData values if available
//           dataToSend.FirstName = getOrderFormData.firstName
//           dataToSend.FamilyName = getOrderFormData.lastName
//           dataToSend.Email = getOrderFormData.email
//           dataToSend.Country = getOrderFormData.country
//           dataToSend.Phone = getOrderFormData.phone
//           dataToSend.Street = getOrderFormData.street
//           dataToSend.City = getOrderFormData.city
//           dataToSend.Zip = getOrderFormData.zipCode
//           dataToSend.present = present
//         }
//         // Function to send payment data
//         const firstResponse = await customFetch.post('/orders/paymentgw', {
//           data: dataToSend,
//         })
//         console.log(firstResponse.data);
//         setFormData(firstResponse.data)
//         //CREATE THE ORDER
//         const deliveryData = {
//             ...getOrderFormData.delivery,
//             shippingCompany: getOrderFormData.shippingCompany,
//             shippingMethod: getOrderFormData.shippingMethod,
//         }
//         dispatch(
//           createOrder({
//             orderData: firstResponse.data, // Pass formData to create the order
//             cartItems,
//             shipping_fee,
//             deliveryData
//           })
//         )
//       } catch (error) {
//         console.error('Error making payment or creating order:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     // Call the function when the component mounts
//     fetchData()
//   }, []) // The empty array [] ensures this effect runs only once on mount

//   console.log(formData)
//   if (isLoading) {
//     return <Spinner />
//   }

//   const handleSubmit = () => {
//     const form = document.createElement('form')
//     form.method = 'POST'
//     form.action = 'https://test.24-pay.eu/pay_gate/paygt'

//     for (const key in formData) {
//       const input = document.createElement('input')
//       input.type = 'hidden'
//       input.name = key
//       input.value = formData[key]
//       form.appendChild(input)
//     }

//     document.body.appendChild(form)
//     form.submit()
//   }

//   return (
//     <Wrapper>
//       <CartHero cart title='Pay' />

//       <Container className='section section-center'>
//         <Row>
//           <Col lg='12'>
//             <Wrapper className=''>
//               <div className='empty'>
//                 <h2>Payment gateway</h2>
//                 {/* Check if data is not empty before rendering the button */}
//                 {formData && <button onClick={handleSubmit}>Zaplatit</button>}
//               </div>
//             </Wrapper>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs='12'>
//             <div className='link-container'>
//               <Link to='/cart/review' className='link-btn'>
//                 Go back
//               </Link>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </Wrapper>
//   )
// }

// export default Payment

// const Wrapper = styled.section`
//   .empty {
//     text-align: center;
//     h2 {
//       margin-bottom: 1rem;
//       text-transform: none;
//     }
//   }
//   .link-container {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 2rem;
//   }
//   .link-btn {
//     background: transparent;
//     border-color: transparent;
//     text-transform: capitalize;
//     padding: 0.25rem 0.5rem;
//     background: var(--clr-primary-5);
//     color: var(--clr-white);
//     border-radius: var(--radius);
//     letter-spacing: var(--spacing);
//     font-weight: 400;
//     cursor: pointer;
//   }
//   .clear-btn {
//     background: var(--clr-black);
//   }
// `
