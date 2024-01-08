import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  uploadSingleImage,
  fetchBrand,
  updateBrand,
  removeImage,
  updateBrandData,
} from '../../features/brand/brandSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from './Spinner'
import { Form, Row, Col, Image } from 'react-bootstrap'
import FormRow from '../../pages/FormRow'
import { convertBase64 } from '../../utils/imageUtils'

const BrandPage = () => {
  const { id } = useParams()
  const { isLoading, brand, images } = useSelector((store) => store.brand)
  const [selectedFile, setSelectedFile] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchBrandData = async () => {
    try {
      dispatch(fetchBrand(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch(updateBrandData({ [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: brand.name,
      url: images[0]?.url || '',
      publicId: images[0]?.publicId || '',
    }
    const response = await dispatch(updateBrand({ id, data }))
    console.log(response)
    if (response.payload.status === 'ok') {
      navigate(`/dashboard/brands`)
    }
  }

  //HANDLE IMAGES UPLOAD
  const [file, setFile] = useState(null)
  const [base64URL, setBase64URL] = useState('')

  const handleSingleFileInputChange = async (e) => {
    const selectedFile = e.target.files[0]
    try {
      const base64Result = await convertBase64(selectedFile)
      selectedFile['base64'] = base64Result
      setBase64URL(base64Result)
      dispatch(
        uploadSingleImage({
          image: base64Result,
          id,
          modelName: 'Company', //BRAND in express is model Company
        })
      )
      setSelectedFile(selectedFile)
    } catch (err) {
      console.log(err)
    }
  }

  const removeBrandImage = (id, publicId) => {
    dispatch(removeImage({ id, publicId }))
      .then(() => {
        // Once removeImage is successful, fetch updated brand data
        dispatch(fetchBrand(id))
      })
      .then(() => {
        setSelectedFile(null)
      })
      .catch((error) => {
        // Handle errors if necessary
        console.error('Error removing image:', error)
      })
  }

  useEffect(() => {
    fetchBrandData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]) // Include dispatch and id in the dependency array to refetch on changes

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {brand && (
        <>
          <Row>
            <Col xs={6} md={4}>
              <h3>
                {brand.name}: #{brand.id}
              </h3>
              {/* Render other company details */}
              <Form onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <FormRow
                    col='12'
                    type='text'
                    id='name'
                    label='Name'
                    name='name'
                    value={brand.name}
                    onChange={handleInputChange}
                  />
                </Row>
                <Row>
                  <Col md={4}>
                    <input
                      type='file'
                      name='file'
                      onChange={handleSingleFileInputChange}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col md='6'>
              {/* // TODO EITHER NULL OR EMPTY STRING */}
              {brand.url !== '' && brand.url !== null ? (
                <div>
                  <Image src={brand.url} thumbnail />
                  <button
                    className='btn'
                    onClick={() => removeBrandImage(id, brand.publicId)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                images &&
                images.map((image) => (
                  <div key={image.publicId}>
                    <Image src={image.url} thumbnail />
                    <button
                      className='btn'
                      onClick={() => removeBrandImage(brand.id, image.publicId)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </Col>
          </Row>
          {/* Submit button outside the form */}
          <Row>
            <Col md='6'>
              <button type='button' className='btn' onClick={handleSubmit}>
                Submit
              </button>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default BrandPage

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import customFetch from '../../utils/axios';
// import { useSelector, useDispatch } from 'react-redux'
// import {fetchBrand} from '../../features/brand/brandSlice'

// import { useLocation } from 'react-router-dom'
// import { Form, Row, Col, Image } from 'react-bootstrap'
// import FormRow from '../../pages/FormRow'
// import { uploadSingleImage } from '../../features/brand/brandSlice'
// import { convertBase64 } from '../../utils/imageUtils'
// import Spinner from './Spinner'

// function BrandPage() {
//   const { brandName } = useParams();
//   const dispatch = useDispatch();
//   const {isLoading, brands} = useSelector((store) => store.brand)

//   const fetchData = async() => {
//     try {
//       dispatch(fetchBrand(brandName))
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       Brand Page
//     </div>
//   )
// }

// export default BrandPage

//  import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useLocation } from 'react-router-dom'
// import { Form, Row, Col, Image } from 'react-bootstrap'
// import FormRow from '../../pages/FormRow'
// import { uploadSingleImage } from '../../features/brand/brandSlice'
// import { convertBase64 } from '../../utils/imageUtils'
// import Spinner from './Spinner'

// function BrandPage() {
//   const location = useLocation()
//   const { company } = location.state || {}
//   const { isLoading, images } = useSelector((store) => store.brand)
//   const [brand, setBrand] = useState({
//     name: company.name,
//   })
//   const dispatch = useDispatch()

//   const handleInputChange = (event) => {
//     const { name, value } = event.target
//     setBrand({ ...brand, [name]: value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log('submitting form')
//   }

//   if (isLoading) {
//     return <Spinner />
//   }

//   return (
//     <div>
//       Brand Page
//       {company && (
//         <Row>
//           <Col xs={6} md={4}>
//             <h3>{company.id}</h3>
//             <p>{brand.name}</p>
//             {/* Render other company details */}
//             <Form onSubmit={handleSubmit}>
//               <Row className='mb-3'>
//                 <FormRow
//                   col='12'
//                   type='text'
//                   id='name'
//                   label='Name'
//                   name='name'
//                   value={brand.name}
//                   onChange={handleInputChange}
//                 />
//               </Row>
//               <Row>
//                 <Col md={4}>
//                   <input
//                     type='file'
//                     name='file'
//                     onChange={handleSingleFileInputChange}
//                   />
//                 </Col>
//               </Row>
//             </Form>
//           </Col>
//           <Col xs={6} md={4}>
//             {images &&
//               images.map((image) => (
//                 <div key={image.publicId}>
//                   <Image src={image.url} thumbnail />
//                 </div>
//               ))}
//           </Col>
//         </Row>
//       )}
//     </div>
//   )
// }

// export default BrandPage

// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   uploadSingleImage,
//   fetchBrand,
//   updateBrand,
//   removeImage,
// } from '../../features/brand/brandSlice'
// import { useNavigate, useParams } from 'react-router-dom'
// import Spinner from './Spinner'
// import { Form, Row, Col, Image } from 'react-bootstrap'
// import FormRow from '../../pages/FormRow'
// import { convertBase64 } from '../../utils/imageUtils'

// const BrandPage = () => {
//   const { id } = useParams()

//   const dispatch = useDispatch()
//   const [selectedFile, setSelectedFile] = useState(null)
//   const { isLoading, brand, images } = useSelector((store) => store.brand)
//   const [formData, setFormData] = useState({
//     name: '', // Use the brand name if available, or an empty string
//     description: '',
//   })
//   const navigate = useNavigate()

//   const fetchData = async () => {
//     dispatch(fetchBrand(id))
//   }

//   useEffect(() => {
//     fetchData()
//   }, [dispatch])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const nameToSubmit = formData.name !== '' ? formData.name : brand.name || '';
//     const data = {
//       name: nameToSubmit,
//       url: images[0]?.url || '',
//       publicId: images[0]?.publicId || '',
//     }
//     const response = await dispatch(updateBrand({ id, data }))
//     console.log(response);
//     if (response.payload.status === 'ok') {
//       navigate(`/dashboard/brands`)
//     }
//   }

//   //HANDLE IMAGES UPLOAD
//   const [file, setFile] = useState(null)
//   const [base64URL, setBase64URL] = useState('')

//   const handleSingleFileInputChange = async (e) => {
//     const selectedFile = e.target.files[0]
//     try {
//       const base64Result = await convertBase64(selectedFile)
//       selectedFile['base64'] = base64Result
//       setBase64URL(base64Result)
//       dispatch(
//         uploadSingleImage({
//           image: base64Result,
//           id,
//           modelName: 'Company', //BRAND in express is model Company
//         })
//       )
//       setSelectedFile(selectedFile)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const removeBrandImage = (id, publicId) => {
//     dispatch(removeImage({ id, publicId }))
//       .then(() => {
//         // Once removeImage is successful, fetch updated brand data
//         dispatch(fetchBrand(id))
//       })
//       .then(() => {
//         setSelectedFile(null)
//       })
//       .catch((error) => {
//         // Handle errors if necessary
//         console.error('Error removing image:', error)
//       })
//   }

//   if (isLoading) {
//     return <Spinner />
//   }

//   console.log('Form Data ', formData);
//   console.log('Brand ', brand);
//   return (
//     <>
//       {brand ? (
//         <div>
//           <h3>{formData.name || brand.name}</h3>
//           <Row>
//             <Col md='6'>
//               <Form>
//                 <Row className='mb-3'>
//                   <FormRow
//                     col='12'
//                     type='text'
//                     id='name'
//                     label='Name'
//                     name='name'
//                     value={formData.name || brand.name}
//                     onChange={handleInputChange}
//                   />
//                 </Row>
//                 <Row>
//                   <Col md={4}>
//                     <input
//                       type='file'
//                       name='file'
//                       onChange={handleSingleFileInputChange}
//                     />
//                     {selectedFile && <p>Selected file: {selectedFile.name}</p>}
//                   </Col>
//                 </Row>
//               </Form>
//             </Col>
//             <Col md='6'>
//               {brand.url !== null ? (
//                 <div>
//                   <Image src={brand.url} thumbnail />
//                   <button
//                     className='btn'
//                     onClick={() => removeBrandImage(id, brand.publicId)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : (
//                 images &&
//                 images.map((image) => (
//                   <div key={image.publicId}>
//                     <Image src={image.url} thumbnail />
//                     <button
//                       className='btn'
//                       onClick={() => removeBrandImage(brand.id, image.publicId)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))
//               )}
//             </Col>
//           </Row>
//         </div>
//       ) : null}

//       {/* Submit button outside the form */}
//       <Row>
//         <Col md='6'>
//           <button type='button' className='btn' onClick={handleSubmit}>
//             Submit
//           </button>
//         </Col>
//       </Row>
//     </>
//   )
// }

// export default BrandPage

// // import React, { useEffect, useState } from 'react'
// // import { useParams } from 'react-router-dom';
// // import customFetch from '../../utils/axios';
// // import { useSelector, useDispatch } from 'react-redux'
// // import {fetchBrand} from '../../features/brand/brandSlice'

// // import { useLocation } from 'react-router-dom'
// // import { Form, Row, Col, Image } from 'react-bootstrap'
// // import FormRow from '../../pages/FormRow'
// // import { uploadSingleImage } from '../../features/brand/brandSlice'
// // import { convertBase64 } from '../../utils/imageUtils'
// // import Spinner from './Spinner'

// // function BrandPage() {
// //   const { brandName } = useParams();
// //   const dispatch = useDispatch();
// //   const {isLoading, brands} = useSelector((store) => store.brand)

// //   const fetchData = async() => {
// //     try {
// //       dispatch(fetchBrand(brandName))
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   return (
// //     <div>
// //       Brand Page
// //     </div>
// //   )
// // }

// // export default BrandPage

// //  import React, { useState } from 'react'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { useLocation } from 'react-router-dom'
// // import { Form, Row, Col, Image } from 'react-bootstrap'
// // import FormRow from '../../pages/FormRow'
// // import { uploadSingleImage } from '../../features/brand/brandSlice'
// // import { convertBase64 } from '../../utils/imageUtils'
// // import Spinner from './Spinner'

// // function BrandPage() {
// //   const location = useLocation()
// //   const { company } = location.state || {}
// //   const { isLoading, images } = useSelector((store) => store.brand)
// //   const [brand, setBrand] = useState({
// //     name: company.name,
// //   })
// //   const dispatch = useDispatch()

// //   const handleInputChange = (event) => {
// //     const { name, value } = event.target
// //     setBrand({ ...brand, [name]: value })
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     console.log('submitting form')
// //   }

// //   if (isLoading) {
// //     return <Spinner />
// //   }

// //   return (
// //     <div>
// //       Brand Page
// //       {company && (
// //         <Row>
// //           <Col xs={6} md={4}>
// //             <h3>{company.id}</h3>
// //             <p>{brand.name}</p>
// //             {/* Render other company details */}
// //             <Form onSubmit={handleSubmit}>
// //               <Row className='mb-3'>
// //                 <FormRow
// //                   col='12'
// //                   type='text'
// //                   id='name'
// //                   label='Name'
// //                   name='name'
// //                   value={brand.name}
// //                   onChange={handleInputChange}
// //                 />
// //               </Row>
// //               <Row>
// //                 <Col md={4}>
// //                   <input
// //                     type='file'
// //                     name='file'
// //                     onChange={handleSingleFileInputChange}
// //                   />
// //                 </Col>
// //               </Row>
// //             </Form>
// //           </Col>
// //           <Col xs={6} md={4}>
// //             {images &&
// //               images.map((image) => (
// //                 <div key={image.publicId}>
// //                   <Image src={image.url} thumbnail />
// //                 </div>
// //               ))}
// //           </Col>
// //         </Row>
// //       )}
// //     </div>
// //   )
// // }

// // export default BrandPage
