import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { formatPrice } from '../utils/helpers'
import Wrapper from '../assets/wrappers/Info'
const OrderSummary = ({ orderDetail }) => {
  return (
    <div>
      <h2>Objednávka: #{orderDetail.id}</h2>
      <hr />
      <Card>
        <Card.Body>
          <Card.Text>
            {orderDetail.orderItems.map((item) => (
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
                {formatPrice(orderDetail.subtotal)}
              </span>
            </p>

            <p class='d-flex justify-content-between pb-2'>
              <span>Shipping</span>
              <span class='font-medium'>
                {formatPrice(orderDetail.shippingFee)}
              </span>
            </p>
            <p class='d-flex justify-content-between pb-2'>
              <span class='font-bold'>Order Total</span>
              <span class='font-bold'>{formatPrice(orderDetail.total)}</span>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default OrderSummary
