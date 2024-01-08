import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { CartHero, OrderButtons } from '.'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { formatPrice} from '../utils/helpers'
import { useSelector } from 'react-redux'

import { OrderCustomer } from '../shared'


const CartReviewOrder = () => {
  const navigate = useNavigate()
  // Read data from local storage
  const orderFormData = JSON.parse(localStorage.getItem('orderForm'))
  const cartData = JSON.parse(localStorage.getItem('cartItems'))

  
  const { cart, total_items, total_amount, shipping_fee, present } = useSelector(
    (store) => store.cart
  )

  
  const goToPg = () => {
    navigate('/cart/pay')
  }

 
  return (
    <div>
      <CartHero cart title='Review order' />

      <Container className='section section-center'>
        <Row>
          <Col xs='12' lg='6'>
            <OrderCustomer orderDetail={orderFormData} />
          </Col>
          <Col xs lg='6' className={window.innerWidth < 576 ? 'mt-5' : ''}>
            <div>
              <h2>Objednávka:</h2>
              <hr />
              <Card>
                <Card.Body>
                  <Card.Text>
                    {cartData.map((item) => (
                      <div key={item.id}>
                        <p class='d-flex justify-content-between'>
                          <span>
                            <strong>Product name</strong>
                          </span>
                          <span>{item.name}</span>
                        </p>
                        <p class='d-flex justify-content-between pb-2'>
                          <span>
                            <strong>Quantity</strong>
                          </span>
                          <span>{item.amount}</span>
                        </p>
                        <p class='d-flex justify-content-between pb-2'>
                          <span>
                            <strong>Price</strong>
                          </span>
                          <span>{formatPrice(item.price)}</span>
                        </p>
                        <hr />
                      </div>
                    ))}

                    <p class='d-flex justify-content-between pb-2'>
                      <span>Subtotal</span>
                      <span class='font-medium'>
                        {formatPrice(total_amount)}
                      </span>
                    </p>

                    <p class='d-flex justify-content-between pb-2'>
                      <span>Shipping</span>
                      <span class='font-medium'>
                        {formatPrice(shipping_fee)}
                      </span>
                    </p>
                    <p class='d-flex justify-content-between pb-2'>
                      <span class='font-bold-total'>Order Total</span>
                      <span class='font-bold-total'>
                        {formatPrice(total_amount + shipping_fee)}
                      </span>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs='12'>
            <OrderButtons goToPg={goToPg} goBack={'/cart/checkout'}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CartReviewOrder


