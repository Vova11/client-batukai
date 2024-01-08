import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Info'
import {
  BsFillPrinterFill,
  BsFillSignIntersectionYFill,
  BsLink,
} from 'react-icons/bs'
import { BiWorld } from 'react-icons/bi'
import customFetch from '../../utils/axios'
import styled from 'styled-components'
import { PacketaLabelPrint, PacketaStatusInfo } from './'
import { toast } from 'react-toastify'
import Spinner from './Spinner.js'

const ShippingPacketaDetails = ({ orderDetail }) => {
  const { resultId, deliveryType, barcodeText } = orderDetail.delivery
  const [show, setShow] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [pdfData, setPdfData] = useState(null)
  const [statusData, setStatusData] = useState(null)
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)

  const handleShowPrintModal = () => {
    setShowPrintModal(true)
  }

  const handleShowStatusModal = () => {
    setShowStatusModal(true)
  }

  const handleClosePrintModal = () => {
    setShowPrintModal(false)
  }

  const handleCloseStatusModal = () => {
    setShowStatusModal(false)
  }

  const fetchPdfData = async () => {
    const { resultId, deliveryType } = orderDetail.delivery

    const data = {
      packetId: resultId,
      id: orderDetail.id,
      type: deliveryType,
    }

    try {
      setIsLoading(true) // Set loading state to true
      const response = await customFetch.post(
        '/shipping/print-packeta-pdf',
        data
      )
      console.log(response)
      const pdfData = response.data.base64PdfData
      //Create a data URI for the PDF
      const dataUri = `data:application/pdf;base64,${pdfData}`
      setPdfData(dataUri)
      // openModal() // Open the modal after fetching the data
      // handleShow()
      handleShowPrintModal()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false) // Set loading state to false when done loading
    }
  }

  const handleToCopyToClipboard = (textToCopy) => {
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setIsCopied(true)
          toast.success('Text copied to clipboard')
        })
        .catch((err) => {
          console.error('Unable to copy to clipboard', err)
        })
    }
  }

  const handleCopyToClipboard = () => {
    handleToCopyToClipboard(barcodeText)
  }

  const trackingLink = () => {
    const url = `https://tracking.packeta.com/sk_SK/?id=${resultId}`
    window.open(url, '_blank')
  }
  const packetaInfo = async () => {
    const data = {
      packetId: resultId,
      id: orderDetail.id,
      type: deliveryType,
    }
    try {
      setIsLoading(true) // Set loading state to true
      const response = await customFetch.post('/shipping/packeta-status', data)
      setStatusData(response.data.data)
      handleShowStatusModal()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false) // Set loading state to false when done loading
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h3>Zásielka:</h3>
      <hr />
      <Wrapper>
        <p className='info-row mb-3'>
          <strong>Barcode Text:</strong>
          <ShowPointer onClick={handleCopyToClipboard}>
            {orderDetail.delivery.barcodeText}
          </ShowPointer>
        </p>
        <p className='info-row mb-3'>
          <strong>Vytlacit stitok:</strong>
          <ShowPointer onClick={fetchPdfData}>
            <BsFillPrinterFill size={30} />
          </ShowPointer>
        </p>
        <p className='info-row mb-3'>
          <strong>Packeta Info:</strong>
          <ShowPointer onClick={packetaInfo}>
            <BiWorld size={30} />
          </ShowPointer>
        </p>
        <p className='info-row mb-3'>
          <strong>Tracking link:</strong>
          <ShowPointer onClick={trackingLink}>
            <BsLink id='link' size={30} />
          </ShowPointer>
        </p>
        <PacketaLabelPrint
          show={showPrintModal}
          handleClose={handleClosePrintModal}
          id={orderDetail.id}
          dataUri={pdfData}
        />
        <PacketaStatusInfo
          show={showStatusModal}
          handleClose={handleCloseStatusModal}
          id={orderDetail.id}
          data={statusData}
        />
      </Wrapper>
    </div>
  )
}

export default ShippingPacketaDetails

const ShowPointer = styled.span`
  cursor: pointer;
`
