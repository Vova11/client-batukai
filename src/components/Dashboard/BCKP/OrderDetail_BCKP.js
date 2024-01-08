import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  showOrder,
  printPacketaLabel,
  printPacketaLabelHD,
} from '../../../features/orders/ordersSlice.js'
import { saveAs } from 'file-saver'
import Spinner from '../Spinner.js'
import customFetch from '../../../utils/axios.js'
import { Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import { OrderCustomer, OrderSummary } from '../../../shared/index.js'
import { toast } from 'react-toastify'
// import atob from 'atob'
// import PdfViewer from './PdfViewer.js'
import PacketaLabelPrint from '../PacketaLabelPrint.js'

const OrderDetail = () => {
  const { id } = useParams()
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  // const [pdfBlob, setPdfBlob] = useState(null)
  const { isLoading, orderDetail } = useSelector((store) => store.orders)
  // const [deliveryData, setDeliveryData] = useState(null) // Initialize deliveryData state
  // const [orderedProductsData, setOrderedProductsData] = useState(null) // Initialize deliveryData state

  // useEffect(() => {
  //   // Fetch the order details and delivery data
  //   dispatch(showOrder(id)).then(() => {
  //     // Set loading to false after the data has been fetched
  //     setLoading(false)
  //     // Extract the delivery data from orderDetail and store it in the state
  //     if (orderDetail && orderDetail.delivery) {
  //       setDeliveryData(orderDetail.delivery)
  //       setOrderedProductsData(orderDetail.orderItems)
  //     }
  //   })
  // }, [dispatch, id])

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showOrder(id))
    }
    fetchData()
  }, [])

  const generatePDF = async () => {
    setLoading(true)
    const res = await customFetch.post('/orders/create-pdf', orderDetail)
    setLoading(false)
  }

  const downloadPDF = async () => {
    setLoading(true)
    await generatePDF()
    const invoiceFileName = id + orderDetail.msTxnId
    const response = await customFetch.get(
      `/orders/fetch-pdf/${invoiceFileName}`,
      {
        responseType: 'blob',
      }
    )
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
    saveAs(pdfBlob, `invoice_${invoiceFileName}.pdf`)
    setLoading(false)
  }

  //TODO
  // Add tracing status:
  // https://tracking.packeta.com/sk_SK/?id=2518857068
  const confirmOrder = async () => {
    try {
      const res = await customFetch.post('/orders/send-confirmation-email', {
        name: id + orderDetail.msTxnId,
        // Add any other attributes as needed
      })
      // TODO: Add a TOAST or notification for the user
      console.log('Confirmation email sent successfully')
    } catch (error) {
      console.error('Error sending confirmation email:', error)
    }
  }

  // function downloadPDFFile(pdf) {
  //   const linkSource = `data:application/pdf;base64,${pdf}`
  //   const downloadLink = document.createElement('a')
  //   const fileName = 'file.pdf'

  //   downloadLink.href = linkSource
  //   downloadLink.download = fileName
  //   downloadLink.click()
  // }

  const createPacketa = async () => {
    try {
      const response = await customFetch.post('/shipping/create-packeta', {
        orderId: orderDetail.id,
      })
      // const responseData = response.data
      // Handle the responseData as needed (e.g., set it to component state or display it)
      toast.success('Packeta bola vytvorena')
    } catch (error) {
      console.error(
        error.response.data.detail[0].attributes[0].fault[0].fault[0]
      )
      const errorMessage =
        error.response.data.detail[0].attributes[0].fault[0].fault[0]
      console.log('Nebola vytvorena Packeta')
      toast.error(errorMessage)
    }
  }

  // const printPacketaSippingLabel = async () => {
  //   const data = {
  //     packetaId: orderDetail.delivery.resultId,
  //     id: orderDetail.id,
  //   }
  //   try {
  //     const response = await dispatch(printPacketaLabel(data))
  //     console.log(response.payload.msg)
  //   } catch (error) {
  //     console.error('Error:', error)
  //     // Handle any errors
  //   }
  // }

  // //SHOW PDF DIRECTLY FROM API
  // const printPacketaSippingLabel = async () => {
  //   const data = {
  //     packetaId: orderDetail.delivery.resultId,
  //     id: orderDetail.id,
  //   }
  //   try {
  //     const response = await dispatch(printPacketaLabel(data))
  //     console.log(response.payload)
  //     const xmlString = response.payload.base64PdfData
  //     const parser = new DOMParser()
  //     const xmlDoc = parser.parseFromString(xmlString, 'text/xml')

  //     // Access the text content of the 'result' element
  //     // const base64String = xmlDoc.querySelector('result').textContent
  //     const byteCharacters = atob(xmlString)
  //     const byteNumbers = new Array(byteCharacters.length)
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i)
  //     }
  //     const byteArray = new Uint8Array(byteNumbers)
  //     const pdfBlob = new Blob([byteArray], { type: 'application/pdf' })
  //     //  const pdfId = Date.now();
  //     //  navigate(`/dashboard/print-label/${pdfBlob}`)
  //     const url = URL.createObjectURL(pdfBlob)
  //     window.open(url, '_blank')
  //   } catch (error) {
  //     console.error('Error:', error)
  //     // Handle any errors
  //   }
  // }

  const printPacketaSippingLabelHD = async () => {
    try {
      const data = {
        packetaId: orderDetail.delivery.resultId,
        id: orderDetail.id,
      }
      const response = await dispatch(printPacketaLabelHD(data))
      console.log(response)
    } catch {}
  }
  const printLabel = () => {
    if (orderDetail.delivery.deliveryType === 'PP/BOX') {
      // printPacketaSippingLabel()
      console.log('Printing PP');
    } else if (orderDetail.delivery.deliveryType === 'HD') {
      printPacketaSippingLabelHD()
    }
  }

  // const openPdfInNewWindow = () => {
  //   const pdfId = orderDetail.id
  //   // Construct the URL for the PDFViewer component with the pdfId parameter
  //   const pdfViewerUrl = `/dashboard/print-label/${pdfId}`
  //   // Use navigate to open the PDF in a new window
  //   navigate(pdfViewerUrl, { target: '_blank' })
  // }

  // const openPdfInNewWindow = (pdfId) => {
  //   // Construct the URL for the PDF route with the pdfId parameter
  //   const pdfViewerUrl = `/dashboard/print-label/${pdfId}`
  //   // Open the PDF in a new window
  //   window.open(pdfViewerUrl, '_blank')
  // }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function openPdfInModal() {
    console.log(orderDetail.id)
    // const iframe = document.getElementById('pdfIframe');
    document.getElementById('pdfModal')
    handleShow()
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      {orderDetail && (
        <div>
          <Row>
            <h2>#{orderDetail.id}</h2>
            <Col xs='12' lg='6'>
              <OrderCustomer orderDetail={orderDetail} />
            </Col>
            <Col xs lg='6' className={window.innerWidth < 576 ? 'mt-5' : ''}>
              <OrderSummary orderDetail={orderDetail} />
              <div className='mt-5 mb-5'>
                <h2>Status balika:</h2>
                <hr />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs='12'>
              <ButtonWrapper className='mb-5'>
                <button onClick={downloadPDF} className='btn'>
                  Download Invoice
                </button>
                <button onClick={confirmOrder} className='btn'>
                  Send invoice to customer
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

                {/* {orderDetail.delivery.deliveryType === 'PP/BOX' && (
                  <button onClick={printLabel} className='btn'>
                    Print Label Odberne Miesto
                  </button>
                )}
                {orderDetail.delivery.deliveryType === 'HD' && (
                  <button onClick={printLabel} className='btn'>
                    Print Label Home Delivery
                  </button>
                )} */}
                <button className='btn' onClick={openPdfInModal}>
                  Print label
                </button>
                <PacketaLabelPrint
                  show={show}
                  handleClose={handleClose}
                  id={orderDetail.id}
                />
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

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { showOrder } from '../../features/orders/ordersSlice.js'
// import { saveAs } from 'file-saver'
// import Spinner from './Spinner.js'
// import customFetch from '../../utils/axios.js'
// import Wrapper from '../../assets/wrappers/Info.js'
// import { OrderSummary, OrderCustomer, OrderDelivery, OrderDeliveryMethod } from './'
// import { Row, Col } from 'react-bootstrap'
// import styled from 'styled-components'

// const OrderDetail = () => {
//   const { id } = useParams()
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const { isLoading, orderDetail } = useSelector((store) => store.orders)
//   const [deliveryData, setDeliveryData] = useState(null) // Initialize deliveryData state
//   const [orderedProductsData, setOrderedProductsData] = useState(null) // Initialize deliveryData state

//   useEffect(() => {
//     // Fetch the order details and delivery data
//     dispatch(showOrder(id)).then(() => {
//       // Set loading to false after the data has been fetched
//       setLoading(false)
//       // Extract the delivery data from orderDetail and store it in the state
//       if (orderDetail && orderDetail.delivery) {
//         setDeliveryData(orderDetail.delivery)
//         setOrderedProductsData(orderDetail.orderItems)
//       }
//     })
//   }, [dispatch, id])

//   const generatePDF = async () => {
//     setLoading(true)
//     const res = await customFetch.post('/orders/create-pdf', orderDetail)
//     setLoading(false)
//   }

//   const downloadPDF = async () => {
//     setLoading(true)
//     await generatePDF()
//     const invoiceFileName = id + orderDetail.msTxnId
//     const response = await customFetch.get(
//       `/orders/fetch-pdf/${invoiceFileName}`,
//       {
//         responseType: 'blob',
//       }
//     )
//     const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
//     saveAs(pdfBlob, `invoice_${invoiceFileName}.pdf`)
//     setLoading(false)
//   }

//   const confirmOrder = async () => {
//     try {
//       const res = await customFetch.post('/orders/send-confirmation-email', {
//         name: id + orderDetail.msTxnId,
//         // Add any other attributes as needed
//       })
//       // TODO: Add a TOAST or notification for the user
//       console.log(res)
//       console.log('Confirmation email sent successfully')
//     } catch (error) {
//       console.error('Error sending confirmation email:', error)
//     }
//   }

//   console.log(orderDetail)

//   return (
//     <div>
//       {isLoading ? (
//         <Spinner />
//       ) : orderDetail ? (
//         // Render your view using orderDetail directly
//         // For example:
//         <Wrapper>
//           <Row>
//             <Col md='12' className='mb-5'>
//               <h2>Objednavka: #{orderDetail.id}</h2>
//             </Col>

//             <Col md='6'>
//               <OrderCustomer orderDetail={orderDetail} />
//               <OrderDeliveryMethod orderDetail={orderDetail} />
//               <OrderDelivery orderDetail={orderDetail} />

//             </Col>

//             <Col md='6'>
//               <OrderSummary orderDetail={orderDetail} />
//             </Col>
//           </Row>
//           <Row className='mt-5 mb-5'>

//               {orderDetail ? (
//                 <ButtonWrapper>
//                   <button onClick={downloadPDF} className='btn'>
//                     Download PDF
//                   </button>
//                   <button onClick={confirmOrder} className='btn'>
//                     Send invoice to customer
//                   </button>
//                 </ButtonWrapper>
//               ) : (
//                 <p>Order not found</p>
//               )}

//           </Row>
//         </Wrapper>
//       ) : (
//         <p>Order not found</p>
//       )}
//     </div>
//   )
// }

// export default OrderDetail

// const ButtonWrapper = styled.div`
// 	button {
//     margin-right: 10px;
//   }
// `;
