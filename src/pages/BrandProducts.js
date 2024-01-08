import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import customFetch from '../utils/axios';
import { PageHero, ProductList, Filters, Sort } from './'
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from '../components/Dashboard/Spinner'
import { useSelector, dispatch, useDispatch } from 'react-redux'
import { Product, GridView, ListView } from './'
import {updateStateByBrandProducts, updateFilters } from './../features/filter/filterSlice'
import { PageBtnContainer } from '../components/Dashboard'
import {fetchBrands} from '../features/brand/brandSlice'
// import {
// 	loadComapnies,
// } from '../features/allProducts/allProductsSlice';
const BrandProducts = () => {
  const { brandName } = useParams();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const {
    
    filtered_products: products,
    grid_view,
    numOfPages,
    
  } = useSelector((store) => store.filter)

  console.log(brandName);
  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        setIsLoading(true)
        const response = await customFetch.get(`/companies/${brandName}`);
        // dispatch(handleChange({ name: 'company', value: brandName }));
        const result = await dispatch(fetchBrands());
        const loadCompanies = result.payload.rows;
        dispatch(updateStateByBrandProducts({ companies: loadCompanies, company: brandName, products: response.data }))
        dispatch(updateFilters({ name: 'company', value: brandName}));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchBrandProducts();
  }, [brandName]);

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <main>
      <PageHero product />
      <Container className='section section-center'>
        <Row>
          <Col xs='12' lg='3'>
            <Filters />
          </Col>
          <Col xs lg='9'>
            <Sort />
            <>
              {grid_view === false ? (
                <ListView products={products} />
              ) : (
                <GridView products={products} />
              )}
              {numOfPages > 1 && <PageBtnContainer />}
            </>
          </Col>
        </Row>
      </Container>
    </main>
  );
}


export default BrandProducts;