import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const OrderButtons = ({ onSubmit, openWidget, goToPg, goBack }) => {
  const navigate = useNavigate()

  const handleContinueShopping = () => {
    navigate('/products')
  }
  const handleGoBack = (path) => {
    console.log(path);
    navigate(path); // Navigate to the specified path
  }

  return (
    <Buttons className='mt-5'>
      {onSubmit && (
        <button type='submit' className='btn' onClick={onSubmit}>
          Submit
        </button>
      )}
      {openWidget && (
        <button type='button' className='link-btn' onClick={openWidget}>
          Zmenit miesto dorucenia
        </button>
      )}
      {goToPg && (
        <button type='button' className='btn' onClick={goToPg}>
          Pay
        </button>
      )}
      <button
        type='button'
        className='link-btn'
        onClick={handleContinueShopping}
      >
        Continue shopping
      </button>
      
      <button
        type='button'
        className='link-btn clear-btn'
        onClick={() => handleGoBack(goBack)}
      >
        Go back
      </button>
      
    </Buttons>
  )
}

export default OrderButtons

const Buttons = styled.section`
  display: flex;
  gap: 20px; /* Adjust spacing as needed */
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
  .btn {
    text-align: center;
    font-weight: 700;
  }
`
