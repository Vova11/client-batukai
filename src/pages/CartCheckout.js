import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { CartHero, OrderForm } from '.'
import { formatPrice } from '../utils/helpers'

const CartCheckout = () => {
  const { cart, total_items, total_amount, shipping_fee } = useSelector(
    (store) => store.cart
  )
  
  return (
    <Wrapper>
      <CartHero cart title='Checkout' />

      <Container className='section section-center'>
        <h2>VAŠE ÚDAJE</h2>
        <hr />
        <Row>
          <Col xs='12' lg='6'>
            <OrderForm />
          </Col>
          <Col xs lg='6' className={window.innerWidth < 576 ? 'mt-5' : ''}>
            <Wrapper className='sticky-element'>
              <Card>
                <Card.Body>
                  <Card.Text>
                    {cart.map((item) => {
                      return (
                        <div>
                          <p class='d-flex justify-content-between pb-2'>
                            <span>
                              <strong>Product</strong>
                            </span>
                            <span>
                              {item.name}
                            </span>
                          </p>
                          {/*<p class='d-flex justify-content-between pb-2'>
                            <span>
                              <strong>Size</strong>
                            </span>
                            <span class='font-medium'>
                              {item.size}
                            </span>
                          </p> */}
                          <p class='d-flex justify-content-between pb-2'>
                            <span>
                              <strong>Quantity</strong>
                            </span>
                            <span>
                              {item.amount}x
                            </span>
                          </p>
                          <hr/>
                        </div>
                      )
                    })}
                    
                    <p class='d-flex justify-content-between pb-2'>
                      <span>
                        Subtotal
                      </span>
                      <span class='font-medium'>
                        {formatPrice(total_amount)}
                      </span>
                    </p>

                    <p class='d-flex justify-content-between pb-2'>
                      <span>
                        Shipping
                      </span>
                      <span class='font-medium'>
                        {formatPrice(shipping_fee)}
                      </span>
                    </p>
                    <hr />
                    <p class='d-flex justify-content-between pb-2'>
                      <span>
                        <strong>Order Total</strong>
                      </span>
                      <span class='font-bold'>
                        {formatPrice(total_amount + shipping_fee)}
                      </span>
                  </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default CartCheckout

const Wrapper = styled.section`
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }
  .sticky-element {
    position: -webkit-sticky;
    position: sticky;
    top: 20px; /* Adjust the distance from the top as needed */
    // background-color: #ffffff; Background color for the sticky element
    padding: 10px;
    // border: 1px solid #dddddd;
    // box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a box shadow for better visibility */
    z-index: 100; /* Optional: Specify a z-index to control stacking order */
  }
  .pb-2 {
    padding-bottom: 0.5rem;
  }
  .font-medium {
    font-weight: 500;
  }
  .border-b {
    border-bottom-width: 1px;
  }
  .border-base-300 {
    --tw-border-opacity: 1;
    border-color: hsl(var(--b3) / var(--tw-border-opacity));
  }
  .product-checkout-list {
    padding-left: 0;
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

  /* Define a CSS class with a margin-top property */
  /* Use @media to conditionally apply the class on xs screens */
  @media (max-width: 989px) {
    /* xs screen size according to Bootstrap */
    .addMarginTop {
      margin-top: 50px;
    }
  }
`
