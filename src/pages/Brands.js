import React, { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/MouseOverOnImages'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import deafult from '../assets/images/hero-bcg-2.svg'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { PageHero } from './'
import { fetchBrands } from '../features/brand/brandSlice'
import Spinner from '../components/Dashboard/Spinner'
import { useNavigate } from 'react-router-dom'
import {
  updateFilters,
  getFilterProducts,
} from '../features/filter/filterSlice'
import {
  handleChange,
  clearAllProductsState,
  getAllProducts,
} from '../features/allProducts/allProductsSlice'

const Brands = () => {
  const { brands, isLoading } = useSelector((store) => store.brand)
  const [hoveredCards, setHoveredCards] = useState(new Array(brands.length).fill(false));
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchBrands())
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const navigateToProducts = (brandName) => {
    console.log(brandName)
    dispatch(updateFilters({ name: 'company', value: brandName }))
    dispatch(handleChange({ name: 'company', value: brandName })) // Update sort in the state
    navigate('/products')
  }

  

 // Array to hold hover state for each card
  

  const handleMouseEnter = (index) => {
    const updatedHoveredCards = [...hoveredCards];
    updatedHoveredCards[index] = true;
    setHoveredCards(updatedHoveredCards);
  };

  const handleMouseLeave = (index) => {
    const updatedHoveredCards = [...hoveredCards];
    updatedHoveredCards[index] = false;
    setHoveredCards(updatedHoveredCards);
  };

  return (
    <main>
      <PageHero title='Brands' />
      <Container className='section section-center'>
      <Row xs={1} md={3} lg={4}>
        {brands.map((brand, index) => (
          <Col key={brand.id} style={{ marginBottom: '20px' }}>
            <Card
              style={{
                height: '100%',
                cursor: 'pointer',
                opacity: hoveredCards[index] ? 1 : 0.7,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => navigateToProducts(brand.name)}
            >
              {/* Assuming brand.image is the URL of the image */}
              <Card.Img
                variant='top'
                src={brand.url}
                alt={brand.name}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </main>
  )
}

export default Brands

// import React, { useState, useEffect } from 'react'
// import Wrapper from '../assets/wrappers/MouseOverOnImages'
// import { FaSearch } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import deafult from '../assets/images/hero-bcg-222.jpeg'
// import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'
// import { useSelector, useDispatch } from 'react-redux'
// import { PageHero } from './'
// import customFetch from '../utils/axios'
// import { getAllProducts } from '../features/allProducts/allProductsSlice'

// const Brands = ({ images, name, price, id }) => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [companies, setCompanies] = useState([])
//   const [count, setCount] = useState()
//   const dispatch = useDispatch();

//   const fetchData = async () => {
//     try {
//       setIsLoading(true) // Set loading state to true
//       const response = await customFetch.get('/companies')
//       setCount(response.data.count)
//       setCompanies(response.data.rows)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setIsLoading(false) // Set loading state to false when done loading
//     }
//   }

//   useEffect(() => {
//     fetchData();
//     // dispatch(getAllProducts())
//   }, [])

//   return (
//     <main>
//       <PageHero title='Brands' />
//       <Container className='section section-center'>
//         <Row>
//           {companies.map((company) => (
//             <Col xs={12} md={4} key={company.id} className='mt-2'>
//               <Wrapper className='featured'>
//                 <div className='container-product'>
//                   <Link
//                     to={`/brands/${company.name
//                       .replace(/\s+/g, '-')
//                       .toLowerCase()}`}
//                   >
//                     <Card>
//                       {company.url ? (
//                         <Card.Img
//                           variant='top'
//                           src={company.url}
//                           alt={company.name}
//                         />
//                       ) : (
//                         <Card.Img
//                           variant='top'
//                           src='https://via.placeholder.com/553x500'
//                           alt='default'
//                         />
//                       )}
//                       <Card.Body>
//                         <Card.Title>{company.name}</Card.Title>
//                         <Link to={`/products/${id}`} className='link'>
//                           <FaSearch />
//                         </Link>
//                         <footer>
//                           <h5>{name}</h5>
//                         </footer>
//                       </Card.Body>
//                     </Card>
//                   </Link>
//                 </div>
//               </Wrapper>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </main>
//   )
// }

// export default Brands

//TO DELETE

// import React, { useState, useEffect } from 'react'
// import { PageHero } from './'
// import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import styled from 'styled-components'
// import customFetch from '../utils/axios'
// import Wrapper from '../assets/wrappers/FeaturedProducts'

// const Brands = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [companies, setCompanies] = useState([])
//   const [count, setCount] = useState()

//   const fetchData = async () => {
//     try {
//       setIsLoading(true) // Set loading state to true
//       const response = await customFetch.get('/companies')
//       setCount(response.data.count)
//       setCompanies(response.data.rows)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setIsLoading(false) // Set loading state to false when done loading
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   if (isLoading) {
//     return <Spinner />
//   }
//   console.log(companies)
//   return (
//     <main>
//       <PageHero title='Brands' />
//       <Container className='section section-center'>
//         <Row>
//           {companies.map((company) => (
//             <Col xs={12} md={4} key={company.id} className='mt-2'>
//             <Wrapper className='section featured'>
//             <Link
//                 to={`/brands/${company.name
//                   .replace(/\s+/g, '-')
//                   .toLowerCase()}`}
//               >
//                 <Card>
//                   {company.url ? (
//                     <Card.Img
//                       variant='top'
//                       src={company.url}
//                       alt={company.name}
//                     />
//                   ) : (
//                     <Card.Img
//                       variant='top'
//                       src='https://via.placeholder.com/553x500'
//                       alt='default'
//                     />
//                   )}
//                   <Card.Body>
//                     <Card.Title>{company.name}</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Link>
//               </Wrapper>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </main>
//   )
// }

// export default Brands
