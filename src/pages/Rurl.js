import axios from 'axios'
import React, { useState, useEffect } from 'react'
import customFetch from '../utils/axios'
import Button from 'react-bootstrap/Button'
import { clearCart } from '../features/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Dashboard/Spinner'
import styled from 'styled-components'
import super_thank_you from '../assets/images/super_thank_you.svg'
import tree_swing from '../assets/images/tree_swing.svg'
import moment_to_relax from '../assets/images/moment_to_relax.svg'

import { useNavigate } from 'react-router-dom'

const Rurl = () => {
  const [queryParams, setQueryParams] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  // 	setIsLoading(true);

  // 	const fetchData = async () => {
  // 		const onPageLoad = () => {
  // 			console.log('page loaded');

  // 			const searchParams = new URLSearchParams(window.location.search);
  // 			const params = {};
  // 			for (const [key, value] of searchParams) {
  // 				params[key] = value;
  // 			}

  // 			setQueryParams(params);
  // 			console.log('Params query: ', queryParams);

  // 			const loadData = async () => {
  // 				const data = {
  // 					msTxnId: queryParams.MsTxnId,
  // 					newStatus: queryParams.Result,
  // 				};
  // 				try {
  // 					const response = await customFetch.post(
  // 						'/orders/updateOrderStatus',
  // 						{
  // 							sup: queryParams.MsTxnId,
  // 							hell: '123',
  // 						}
  // 					);
  // 					console.log(response);
  // 				} catch (error) {
  // 					console.error('Error updating order status:', error);
  // 				} finally {
  // 					setIsLoading(false);
  // 				}
  // 			};

  // 			loadData(); // Call the loadData function
  // 		};

  // 		if (document.readyState === 'complete') {
  // 			onPageLoad();
  // 		} else {
  // 			window.addEventListener('load', onPageLoad, false);

  // 			return () => window.removeEventListener('load', onPageLoad);
  // 		}
  // 	};

  // 	fetchData();
  // }, []); // Ensure that this effect runs only once

  useEffect(() => {
  setIsLoading(true);

  const fetchData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }

    setQueryParams(params);
    console.log('Params query:', params);

    const data = {
      msTxnId: params.MsTxnId,
      newStatus: params.Result,
    };

    try {
      const response = await customFetch.post('/orders/updateOrderStatus', data);
      // Use the updated state variable queryParams directly
      if (params.Result === 'OK' || params.Result === 'PENDING') {
        console.log('MAZEM');
        // clear cart and local storage
        localStorage.removeItem('cartItems');
        localStorage.removeItem('orderForm');
        localStorage.removeItem('packeta');
        dispatch(clearCart());
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);


  const goToPg = () => {
    navigate('/cart/pay')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Wrapper>
      <div className='section-center'>
        {queryParams.Result === 'OK' ? (
          <>
            <h3>Ďakujeme za nákup</h3>
            <div>
              <img
                src={super_thank_you}
                alt='thank you'
                style={{ height: '450px', width: 'auto' }}
              />
            </div>
          </>
        ) : (
          ''
        )}
        {queryParams.Result === 'FAIL' ? (
          <>
            <h3>Platba nebola úspešná</h3>
            <p>Skúste zopakovať svoju objednávku.</p>
            <Button onClick={goToPg}>Späť</Button>
            <div>
              <img
                src={tree_swing}
                alt='thank you'
                style={{ height: '450px', width: 'auto', marginTop: '20px' }}
              />
            </div>
          </>
        ) : (
          ''
        )}
        {queryParams.Result === 'PENDING' ? (
          <>
            <h3>Platba čaká na schválenie</h3>
            <p>Budeme Vás informovať o stave objednávky.</p>
            <div>
              <img
                src={moment_to_relax}
                alt='moment_to_relax'
                style={{ height: '450px', width: 'auto', marginTop: '20px' }}
              />
            </div>
          </>
          
        ) : (
          ''
        )}
      </div>
    </Wrapper>
  )
}

export default Rurl;

const Wrapper = styled.section`
  padding: 5rem 0;
  text-align: center;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    color: var(--clr-grey-5);
  }
`
