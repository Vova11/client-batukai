import React from 'react'
import { Row } from 'react-bootstrap'
import { formatPrice } from '../../utils/helpers'
const OrderSummary = ({ orderDetail }) => {
  return (
    <>
      <Row>
        <h3>Objednavka</h3>
        {orderDetail.orderItems.map((item, index) => (
          <div key={index}>
            <p className='info-row'>
              <strong>Produkt:</strong>
              <span>{item.name}</span>
            </p>
            <p className='info-row'>
              <strong>Cena:</strong>
              <span>{formatPrice(item.price)}</span>
            </p>
            <p className='info-row'>
              <strong>Mnozstvo:</strong>
              <span>{item.amount}x</span>
            </p>
          </div>
        ))}
      </Row>
      <Row className='mt-3'>
        <h3>Darcek</h3>
        <p className='info-row'>
          <strong>Darcek</strong>
          <span>{orderDetail.present ? 'Ano' : 'Nie'}</span>
        </p>
      </Row>
      <Row className='mt-3'>
        <h3>Zaplatit</h3>
        <p className='info-row'>
          <strong>Subtotal:</strong>
          <span>{formatPrice(orderDetail.subtotal)}</span>
        </p>
        <p className='info-row'>
          <strong>Postovne:</strong>
          <span>{formatPrice(orderDetail.shippingFee)}</span>
        </p>
        <p className='info-row'>
          <strong>Total:</strong>
          <span>{formatPrice(orderDetail.total)}</span>
        </p>
      </Row>
    </>
  )
}

export default OrderSummary
