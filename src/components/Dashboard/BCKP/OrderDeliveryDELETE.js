import React from 'react';
import { Row } from 'react-bootstrap'
const OrderDelivery = ({orderDetail}) => {
  return (
    <div>
      <Row className='mb-3'>
        <h3>Dodacie Údaje</h3>
        <p className='info-row'>
          <strong>Nazov:</strong>
          <span>{orderDetail.delivery.description}</span>
        </p>
        <p className='info-row'>
          <strong>Adresa:</strong>
          <span>{orderDetail.delivery.address}</span>
        </p>
        <p className='info-row'>
          <strong>Mesto:</strong>
          <span>{orderDetail.delivery.city}</span>
        </p>
        <p className='info-row'>
          <strong>ZIP:</strong>
          <span>{orderDetail.delivery.zip}</span>
        </p>
        <p className='info-row'>
          <strong>Krajina:</strong>
          <span>{orderDetail.delivery.countryISO}</span>
        </p>
      </Row>
    </div>
  );
}

export default OrderDelivery;
