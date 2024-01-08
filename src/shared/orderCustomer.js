import React from 'react'
import Wrapper from '../assets/wrappers/Info'
import { getCountryCode } from '../utils/helpers'
const OrderCustomer = ({ orderDetail }) => {
  console.log('Pica: ',orderDetail);
  return (
    <div>
      <h2>Fakturačné údaje:</h2>
      <hr />
      <Wrapper>
        <p className='info-row mb-3'>
          <strong>First Name:</strong> <span>{orderDetail.firstName}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>Last Name:</strong> <span>{orderDetail.lastName}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>Email:</strong> <span>{orderDetail.email}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>Phone:</strong> <span>{orderDetail.phone}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>Street:</strong> <span>{orderDetail.street}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>House number:</strong> <span> {orderDetail.houseNumber}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>City:</strong> <span>{orderDetail.city}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>Zip Code:</strong> <span>{orderDetail.zipCode}</span>
        </p>
        <p className='info-row mb-3'>
          <strong>Country:</strong>{' '}
          <span>{getCountryCode(orderDetail.country, 'nameSlovak')}</span>
        </p>
      </Wrapper>
      <div className='mt-5 mb-5'>
        <h3>Dodacie údaje:</h3>
        <hr />
        {orderDetail.shippingMethod === 'Packeta na adresu' ? (
          <Wrapper>
            <p className='info-row mb-3'>
              <strong>Shipping company:</strong> <span>Packeta</span>
            </p>
            <p className='info-row mb-3'>
              <strong>Sposob dorucenia: </strong> <span>Na adresu</span>
            </p>
            {/*<p className='info-row mb-3'>
              <strong>Sposob dorucenia: </strong> <span>{orderDetail.deliveryType}</span>
            </p>*/}
          </Wrapper>
        ) : (
          <Wrapper>
            <p className='info-row mb-3'>
              <strong>Shipping company:</strong>{' '}
              <span>
                {orderDetail.shippingCompany
                  ? orderDetail.shippingCompany
                  : orderDetail.delivery.shippingCompany}
              </span>
            </p>
            <p className='info-row mb-3'>
              <strong>Shipping method:</strong>{' '}
              <span>
                {orderDetail.shippingMethod
                  ? orderDetail.shippingMethod
                  : orderDetail.delivery.shippingMethod}
              </span>
            </p>
            <p className='info-row mb-3'>
              <strong>Delivery type:</strong>
              <span>{orderDetail.delivery.deliveryType}</span>
            </p>
            {orderDetail.delivery.deliveryType === 'PP/BOX' ? (
              <>
                <p className='info-row mb-3'>
                  <strong>Odberné miesto:</strong>{' '}
                  <span>{orderDetail.delivery.description}</span>
                </p>
                <p className='info-row mb-3'>
                  <strong>Adresa:</strong>{' '}
                  <span>{orderDetail.delivery.address}</span>
                </p>
                <p className='info-row mb-3'>
                  <strong>Adresa ID:</strong>{' '}
                  <span>
                    {orderDetail.streetId
                      ? orderDetail.streetId
                      : orderDetail.delivery.streetId}
                  </span>
                </p>

                <p className='info-row mb-3'>
                  <strong>City:</strong>{' '}
                  <span>{orderDetail.delivery.city}</span>
                </p>
                <p className='info-row mb-3'>
                  <strong>Zip Code:</strong>{' '}
                  <span>{orderDetail.delivery.zip}</span>
                </p>
                <p className='info-row mb-3'>
                  <strong>Country:</strong>{' '}
                  <span>{orderDetail.delivery.countryISO}</span>
                </p>
              </>
            ) : ''}
          </Wrapper>
        )}
      </div>
    </div>
  )
}

export default OrderCustomer
