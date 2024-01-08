import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { CartContent, PageHero } from '.'
import { addToCart, countCartTotal } from '../features/cart/cartSlice'
import { Link, Outlet } from 'react-router-dom'
import empty_cart from '../assets/images/empty_cart.svg'

const Modal = ({ onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Congrats!</h2>
        <p>You will get a gift for free.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

const Cart = () => {
  const { cart, total_amount, clearCart } = useSelector((store) => store.cart)
  const [showModal, setShowModal] = useState(false)

  const handleModalClose = () => {
    setShowModal(false)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(countCartTotal())
  }, [cart])

  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <div>
            <h2>Your cart is empty</h2>
          </div>
          <div>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
          <div>
            <img
              src={empty_cart}
              alt='empty cart'
              style={{ height: '450px', width: 'auto' }}
            />
          </div>
        </div>
      </Wrapper>
    )
  }
  console.log(typeof total_amount)
  return (
    <main>
      <PageHero title='Cart' />
      <Wrapper className='section section-center'>
        <CartContent />
        <Outlet />
      </Wrapper>
      // TODO PUT 30 as env variable
      {total_amount > 30 && !showModal && (
        <button onClick={() => setShowModal(true)}>Show Modal</button>
      )}
    </main>
  )
}

export default Cart

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
