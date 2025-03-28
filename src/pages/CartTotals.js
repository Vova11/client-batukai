import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { updateShippingFee } from '../features/cart/cartSlice' // Import your action for updating shipping fee

const CartTotals = () => {
  const { total_amount } = useSelector(
    (store) => store.cart
  )
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('sup');
    dispatch(updateShippingFee())
  }, [])

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal :<span>{formatPrice(total_amount)}</span>
          </h5>
          {/*<p>
						shipping fee :<span>{formatPrice(shipping_fee)}</span>
					</p>
					<hr />
					<h4>
						order total :<span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>*/}
          <h4>
            order total :<span>{formatPrice(total_amount)}</span>
          </h4>
        </article>

        <Link to='/cart/checkout' className='btn'>
          proceed to checkout
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
    text-transform: capitalize;
    margin-top: 2rem;
  }

  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals
