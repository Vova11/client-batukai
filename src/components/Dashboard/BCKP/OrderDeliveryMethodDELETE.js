import React from 'react'
import { Row } from 'react-bootstrap'
const OrderDeliveryMethod = ({ orderDetail }) => {
  return (
    <>
      <Row className='mb-3'>
        <h3>Sposob dorucenia</h3>
        <p className='info-row'>
          <strong>Spolocnost:</strong>
          <span>
            {orderDetail.delivery.shippingCompany}
          </span>
        </p>
        <p className='info-row'>
          <strong>metoda:</strong>
          <span>{orderDetail.delivery.shippingMethod}</span>
        </p>
      </Row>
    </>
  )
}

export default OrderDeliveryMethod
