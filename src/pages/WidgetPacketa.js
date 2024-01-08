import React, { useState, useEffect, Fragment } from 'react'
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Image,
  Carousel,
} from 'react-bootstrap'
import { CartHero, OrderButtons } from './'
import Wrapper from '../assets/wrappers/Info'
import WidgetStart from './WidgetStart'
import axios from 'axios'
import { toast } from 'react-toastify'
import defaultImage from './../assets/images/hero-bcg-2.svg'
import { useDispatch } from 'react-redux'
import { setRoute } from '../features/navigation/navigationSlice'
import { useNavigate } from 'react-router-dom'

const WidgetPacketa = () => {
  const existingOrderForm = JSON.parse(localStorage.getItem('orderForm')) || {} // Get existing orderForm or initialize as an empty object if not present
  const apiKey = process.env.REACT_APP_PACKETA_API
  const dispatch = useDispatch()
  const [responseData, setResponseData] = useState(null)
  const navigate = useNavigate()

  const openWidget = () => {
    const options = {
      // livePickupPoint: true, if you want #18+
      language: ['sk', 'cz', 'en'],
    }
    if (window.Packeta && window.Packeta.Widget) {
      // Use the global Packeta.Widget object to open the widget
      window.Packeta.Widget.pick(apiKey, handleSelectedPoint, options)
    } else {
      console.error('Packeta.Widget is not available.')
    }
  }

  const validateSelectedPoint = async (selectedPoint) => {
    const validationEndpoint =
      'https://widget.packeta.com/v6/api/pps/api/widget/v1/validate'
    const languageCode = 'sk' // Replace with your desired language code (e.g., 'en')

    const requestBody = {
      apiKey,
      point: {
        id: selectedPoint.id,
        carrierId: selectedPoint.carrierId,
        carrierPickupPointId: selectedPoint.carrierPickupPointId,
      },
      options: {
        livePickupPoint: false,
        country: 'cz,sk,hu',
      },
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Language': languageCode,
    }

    try {
      const response = await axios.post(validationEndpoint, requestBody, {
        headers,
      })

      if (response.status === 200) {
        const validationResponse = response.data
        return validationResponse
      } else {
        console.error('Error while validating the selected point.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
    return null // Return null if validation fails
  }

  const handleValidation = async (validationResponse, selectedPoint) => {
    // Perform validation checks
    // If validation fails, set responseData to null
    if (!validationResponse.isValid) {
      toast.error(validationResponse.errors[0].description)
      setResponseData(null)
      localStorage.removeItem('packeta')
    }
    // Otherwise, set the responseData accordingly
    else {
      localStorage.setItem('packeta', JSON.stringify(selectedPoint))
    }
  }

  // Define a function to handle the selected point
  const handleSelectedPoint = async (selectedPoint) => {
    if (selectedPoint === null) {
      return
    }
    setResponseData(selectedPoint)
    const validationResponse = await validateSelectedPoint(selectedPoint)
    if (validationResponse) {
      handleValidation(validationResponse, selectedPoint)
    }
  }

  useEffect(() => {
    const storedFormData = localStorage.getItem('packeta')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setResponseData(parsedFormData)
    } else {
      // Call the openPacketaWidget function when the component mounts
      openWidget()
    }
  }, [dispatch]) // The empty dependency array ensures it's only called once when the component mounts

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (responseData) {
      // Create a Delivery object with the data
      const delivery = {
        name: responseData.name,
        description: responseData.place,
        address: responseData.street,
        city: responseData.city,
        zip: responseData.zip,
        countryISO: responseData.country,
        branchCode: responseData.branchCode,
        streetId: responseData.id,
        status: '',
        resultId: '',
        barcode: '',
        barcodeText: '',
      }

      // You can now use the 'delivery' object or send it to your backend for further processing
      console.log('Delivery Object:', delivery)

      // Attach the 'delivery' object to the 'orderForm'
      const updatedOrderForm = {
        ...existingOrderForm, // Copy existing data
        delivery: delivery, // Attach the 'delivery' object
      }
      // Store the updated 'orderForm' object back in localStorage
      localStorage.setItem('orderForm', JSON.stringify(updatedOrderForm))
      // // dispatch(setRoute('/cart/review'));
      navigate('/cart/review')
    }
  }

  const ImageCarousel = ({ photos }) => {
    console.log(photos)

    if (photos.length === 0) {
      // Display a default image when photos is empty
      return (
        <Image
          src={defaultImage}
          alt='Default Image'
          className='d-block w-100'
        />
      )
    }

    return (
      <Carousel>
        {photos.map((photo, index) => (
          <Carousel.Item key={index}>
            <Image
              src={photo.normal}
              alt={`Slide ${index}`}
              className='d-block w-100'
            />
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }
  console.log('Response data ', responseData)
  return (
    <Fragment>
      <CartHero cart title='Delivery - packeta' />
      {responseData === null ? (
        // Render this layout when responseData is null
        <WidgetStart openWidget={openWidget} />
      ) : (
        <Container className='section section-center'>
          <Row>
            <Col md='6'>
              <Wrapper>
                <p className='info-row'>
                  <strong>Nazov odberneho miesta:</strong>{' '}
                  <span>{responseData.name}</span>
                </p>
                <p className='info-row'>
                  <strong>ID:</strong> <span>{responseData.id}</span>
                </p>
                <p className='info-row'>
                  <strong>Ulica:</strong>
                  <span>{responseData.street}</span>
                </p>
                <p className='info-row'>
                  <strong>Zip:</strong>
                  <span>{responseData.zip}</span>
                </p>
                <p className='info-row'>
                  <strong>Mesto:</strong> <span>{responseData.city}</span>
                </p>
                {/* Add more info rows here if needed */}
                <form>
                  <input type='hidden' name='id' value={responseData.id} />
                  <input type='hidden' name='name' value={responseData.name} />
                  <input
                    type='hidden'
                    name='nameStreet'
                    value={responseData.street}
                  />
                  <input type='hidden' name='city' value={responseData.city} />
                  <input type='hidden' name='zip' value={responseData.zip} />
                  {/* Add more hidden input fields for other data if needed */}
                </form>
              </Wrapper>
            </Col>
            <Col md={6}>
              <ImageCarousel photos={responseData.photos} />
            </Col>
          </Row>
          <Row>
            <OrderButtons
              onSubmit={handleSubmit}
              openWidget={openWidget} // Pass the submit handler as a prop
              goBack={'/cart/checkout'}
            />
          </Row>
        </Container>
      )}
    </Fragment>
  )
}

export default WidgetPacketa

// bellow works without click

// import React, { useState, useEffect } from 'react';

// const Boxpacketa = () => {
// 	const [responseData, setResponseData] = useState(null);

// 	// Define a function to open the Packeta widget
// 	const openPacketaWidget = () => {
// 		const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
// 		const options = {};

// 		if (window.Packeta && window.Packeta.Widget) {
// 			// Use the global Packeta.Widget object to open the widget
// 			window.Packeta.Widget.pick(apiKey, handleSelectedPoint, options);
// 		} else {
// 			console.error('Packeta.Widget is not available.');
// 		}
// 	};

// 	// Define a function to handle the selected point
// 	const handleSelectedPoint = (selectedPoint) => {
// 		console.log('Selected Point:', selectedPoint);
// 		// You can perform actions with the selectedPoint here
// 	};

// 	useEffect(() => {
// 		// Call the openPacketaWidget function when the component mounts
// 		openPacketaWidget();
// 	}, []); // The empty dependency array ensures it's only called once when the component mounts

// 	return (
// 		<div>
// 			<h1>Packeta Component</h1>
// 			{/* The Packeta widget will be opened when the component loads */}
// 			{/* Other components and JSX */}
// 		</div>
// 	);
// };

// export default Boxpacketa;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import customFetch from '../utils/axios';
// // / Import the Packeta library (if you haven't already)
// import 'https://widget.packeta.com/v6/www/js/library.js';

// const BoxPacketa = () => {
// 	const [responseData, setResponseData] = useState(null);

// 	const createPacket = async () => {
// 		const data = {
// 			number: '123456',
// 			name: 'Petr',
// 			surname: 'Novák',
// 			email: 'petr@novak.cz',
// 			phone: '+420777123456',
// 			addressId: 79,
// 			cod: 145,
// 			value: 145.55,
// 			eshop: 'muj-eshop.cz',
// 		};
// 		try {
// 			const response = await customFetch.post('/orders/packeta', {
// 				data: data,
// 			});

// 			console.log(response);
// 			// // Loop through the message array
// 			// for (const item of response.data.message) {
// 			// 	const attributes = item['$']; // Access attributes within each object
// 			// 	const parts = item.part; // Access the part array within each object

// 			// 	console.log('Attributes:', attributes);

// 			// 	// Loop through the part array
// 			// 	for (const part of parts) {
// 			// 		console.log('Part:', part);
// 			// 	}
// 			// }

// 			setResponseData(response.data);
// 		} catch (error) {
// 			// Handle error
// 			console.error(error);
// 		}
// 	};

// 	const handleIframeMessage = (event) => {
// 		// Check the origin of the message for security
// 		if (event.origin !== 'https://widget.packeta.com') {
// 			return;
// 		}
// 		// Access the data sent by the iframe
// 		const dataFromIframe = event.data;
// 		// Handle the data received from the iframe
// 		console.log('Data from iframe:', dataFromIframe);

// 		// You can update your component's state or perform other actions here
// 	};

// 	useEffect(() => {
// 		// Add an event listener for messages from the iframe
// 		window.addEventListener('message', handleIframeMessage);

// 		// Return a cleanup function to remove the event listener when the component unmounts
// 		return () => {
// 			window.removeEventListener('message', handleIframeMessage);
// 		};
// 	}, []);

// useEffect(() => {
// Load the Packeta library asynchronously
// 	const script = document.createElement('script');
// 	script.src = 'https://widget.packeta.com/v6/www/js/library.js';
// 	script.async = true;

// 	// Attach an event listener to the script's onload event
// 	script.onload = () => {
// 		// Define your Packeta API key
// 		const packetaApiKey = 'XXX XXX XXX'; // Replace with your actual API key

// 		// Define any additional options you need (if any)
// 		const packetaOptions = {
// 			valueFormat:
// 				'"Packeta",id,carrierId,carrierPickupPointId,name,city,street',
// 		};

// 		// Function to handle pickup point selection
// 		function showSelectedPickupPoint(point) {
// 			const saveElement = document.querySelector('.packeta-selector-value');
// 			saveElement.innerText = '';
// 			if (point) {
// 				console.log('Selected point', point);
// 				saveElement.innerText = 'Address: ' + point.formatedValue;
// 			}
// 		}

// 		// Specify the target origin (the Packeta iframe's origin)
// 		const targetOrigin = 'https://widget.packeta.com';

// 		// // Use the global Packeta object to open the widget
// 		Packeta.Widget.pick(
// 			packetaApiKey,
// 			showSelectedPickupPoint,
// 			packetaOptions,
// 			targetOrigin
// 		);
// 	};

// 	// Append the script element to the head of the document
// 	document.head.appendChild(script);

// 	// Return a cleanup function to remove the script element when the component unmounts
// 	return () => {
// 		document.head.removeChild(script);
// 	};
// }, []);

// 	// Define a function to open the Packeta widget
// 	const openPacketaWidget = () => {
// 		if (window.Packeta && window.Packeta.Widget) {
// 			// Use the global Packeta.Widget object to open the widget
// 			window.Packeta.Widget.pick(apiKey, handleSelectedPoint, options);
// 		} else {
// 			console.error('Packeta.Widget is not available.');
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>Packeta Component</h1>
// 			<button onClick={openPacketaWidget}>Open Packeta Widget</button>
// 			<div className='packeta-selector-value'></div>
// 			<button onClick={createPacket}>Create Packet</button>
// 			<iframe
// 				src='https://widget.packeta.com/v6/'
// 				width='100%'
// 				height='800'
// 				sandbox='allow-scripts allow-same-origin '
// 				title='WordPress Widget'
// 			></iframe>
// 			{responseData && (
// 				<div>
// 					<h2>Response Data</h2>
// 					<pre>{JSON.stringify(responseData, null, 2)}</pre>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default BoxPacketa;

// import React, { useState, useEffect, useRef } from 'react';

// const BoxPacketa = () => {
// 	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
// 	const scriptRef = useRef(null);

// 	useEffect(() => {
// 		// Create a script element
// 		const script = document.createElement('script');
// 		script.src = 'https://widget.packeta.com/v6/www/js/library.js';
// 		script.async = true;

// 		// Attach an event listener to the script's onload event
// 		script.onload = () => {
// 			setIsScriptLoaded(true);
// 		};

// 		// Append the script element to the head of the document
// 		document.head.appendChild(script);

// 		// Store the script element in the ref for future reference
// 		scriptRef.current = script;
// 		console.log(scriptRef);

// 		// Cleanup: Remove the script element if the component unmounts
// 		return () => {
// 			if (scriptRef.current) {
// 				document.head.removeChild(scriptRef.current);
// 			}
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			<h1>My Component</h1>
// 			{isScriptLoaded ? (
// 				<p>Script is loaded!</p>
// 			) : (
// 				<p>Script is still loading...</p>
// 			)}
// 		</div>
// 	);
// };

// export default BoxPacketa;

// useEffect(() => {
//   // Call the openPacketaWidget function when the component mounts
//   openPacketaWidget()
// }, []) // The empty dependency array ensures it's only called once when the component mounts

// return (
//   <>
//     <CartHero cart title='Delivery - packeta' />
//     <Container className='section section-center'>
//       <Row>
//         <Col md='6'>
//           <button onClick={openPacketaWidget}>
//             {responseData
//               ? 'Zmeniť miesto doručenia'
//               : 'Vybrať miesto doručenia'}
//           </button>

//         {responseData && (
//           <Info>
//             <p className='info-row'>
//               <strong>Nazov odberneho miesta:</strong>{' '}
//               <span>{responseData.name}</span>
//             </p>
//             <p className='info-row'>
//               <strong>ID:</strong> <span>{responseData.id}</span>
//             </p>
//             <p className='info-row'>
//               <strong>Ulica:</strong>
//               <span>{responseData.street}</span>
//             </p>
//             <p className='info-row'>
//               <strong>Zip:</strong>
//               <span>{responseData.zip}</span>
//             </p>
//             <p className='info-row'>
//               <strong>Mesto:</strong> <span>{responseData.city}</span>
//             </p>

//             <p className='info-row'>
//               <strong>Zip:</strong> <span>{responseData.zip}</span>
//             </p>
//             {/*  <p id='OpeningHoursContainer'></p> */}
//             {responseData && (
//               <form onSubmit={handleFormSubmit}>
//                 <>
//                   <input type='hidden' name='id' value={responseData.id} />
//                   <input
//                     type='hidden'
//                     name='name'
//                     value={responseData.name}
//                   />
//                   <input
//                     type='hidden'
//                     name='nameStreet'
//                     value={responseData.street}
//                   />
//                   <input
//                     type='hidden'
//                     name='city'
//                     value={responseData.city}
//                   />
//                   <input
//                     type='hidden'
//                     name='zip'
//                     value={responseData.zip}
//                   />
//                   {/* Add more hidden input fields for other data if needed */}
//                 </>

//                 <button type='submit' id='payButton'>
//                   Pay
//                 </button>
//               </form>
//             )}
//           </Info>
//         )}
//       </Col>
//       <Col md={6}>
//         {responseData &&
//           responseData.photos.map((photo, index) => (

//               <Col md={3} key={index} onClick={() => openImageModal(photo.normal)}>
//                 <Image
//                   src={photo.thumbnail} // Display thumbnails or smaller images
//                   alt=''
//                   style={imageClass}
//                   rounded
//                 />
//               </Col>

//           ))}
//         <Modal
//           show={selectedImage !== null}
//           onHide={closeImageModal}
//           centered
//           size='sm'
//         >
//           <Modal.Body>
//             {selectedImage && (
//               <Image src={selectedImage} alt='' style={{ width: '100%' }} />
//             )}
//           </Modal.Body>
//         </Modal>
//       </Col>
//     </Row>
//   </Container>
// </>
// )
