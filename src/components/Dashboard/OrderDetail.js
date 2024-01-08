import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { showOrder, sendConfirmationEmail, createInvoice, downloadInvoice } from '../../features/orders/ordersSlice.js'
import Spinner from './Spinner.js'
import customFetch from '../../utils/axios.js'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { OrderCustomer, OrderSummary } from '../../shared'
import { toast } from 'react-toastify'
import ShippingPacketaDetails from './ShippingPacketaDetails.js'

const OrderDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [shippingCreated, setShippingCreated] = useState(false)
  const { isLoading, orderDetail } = useSelector((store) => store.orders)
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(showOrder(id))
    }
    fetchData()
  }, [shippingCreated])

  const downloadInvoicePdf = async () => {
    await dispatch(createInvoice(orderDetail))
    await dispatch(downloadInvoice(orderDetail))
  }
  
  const sendEmailToCustomer = async () => {
    const data = {
        id: orderDetail.id,
        name: orderDetail.id + orderDetail.msTxnId,
        link: `https://tracking.packeta.com/sk_SK/?id=${orderDetail.resultId}`,
        user: {
          firstName: orderDetail.firstName,
          lastName: orderDetail.lastName
        }
      }
    dispatch(sendConfirmationEmail(data))  
  }
    
  const createPacketa = async () => {
    try {
      await customFetch.post('/shipping/create-packeta', {
        orderId: id,
      })
      toast.success('Packeta bola vytvorena')
      setShippingCreated(true)
    } catch (error) {
      console.error(
        error.response.data.detail[0].attributes[0].fault[0].fault[0]
      )
      const errorMessage =
        error.response.data.detail[0].attributes[0].fault[0].fault[0]
      toast.error(errorMessage)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {orderDetail && (
        <div>
          <Row>
            <Col xs='12' lg='6'>
              <OrderCustomer orderDetail={orderDetail} />
            </Col>
            <Col xs lg='6' className={window.innerWidth < 576 ? 'mt-5' : ''}>
              <OrderSummary orderDetail={orderDetail} />
            </Col>
          </Row>
          {orderDetail.delivery.status === 'ok' ? (
            <Row>
              <Col xs='12'>
                <ShippingPacketaDetails orderDetail={orderDetail} />
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col xs='12'>
              <ButtonWrapper className='mb-5'>
                <button onClick={downloadInvoicePdf} className='btn'>
                  Download Invoice
                </button>
                <button
                  onClick={createPacketa}
                  className={`btn ${
                    orderDetail.delivery.status === 'ok' ? 'disabled' : ''
                  }`}
                  disabled={orderDetail.delivery.status === 'ok'}
                >
                  Send To Packeta
                </button>
                <button
                  onClick={sendEmailToCustomer}
                  className={`btn ${
                    orderDetail.delivery.status !== 'ok' ? 'disabled' : ''
                  }`}
                >
                  Send invoice to customer
                </button>
              </ButtonWrapper>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default OrderDetail

const ButtonWrapper = styled.div`
  button {
    margin-right: 10px;
  }
  .disabled {
    background-color: #ccc; /* Gray background color */
    color: #888; /* Gray text color */
    cursor: not-allowed; /* Change the cursor to indicate it's not clickable */
  }
`
