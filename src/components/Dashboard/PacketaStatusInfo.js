import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const PacketaStatusInfo = ({ show, handleClose, id, data }) => {
  if (!data) {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        id='statusModal'
        size='lg'
        centered
      >
        {/* Loading indicator or message */}
        <Modal.Body>Loading data...</Modal.Body>
      </Modal>
    )
  }

  const {
    branchId,
    carrierId,
    carrierName,
    codeText,
    dateTime,
    destinationBranchId,
    externalTrackingCode,
    isReturning,
    statusCode,
    statusText,
    storedUntil,
    textContent,
    links,
  } = data

  return (
    <Modal show={show} onHide={handleClose} id='statusModal' size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title>Order #{id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>BranchId: {branchId}</p>
        <p>carrierId: {carrierId}</p>
        <p>carrierName: {carrierName}</p>
        <p>CodeText: {codeText}</p>
        <p>Date: {dateTime}</p>
        <p>destinationBranchId: {destinationBranchId}</p>
        <p>externalTrackingCode: {externalTrackingCode}</p>
        <p>isReturning: {isReturning}</p>
        <p>statusCode: {statusCode}</p>
        <p>status Text: {textContent}</p>
        <ul>
          {links.map((link) => {
            return (
              <div>
                <li>{link.text}</li>
                <li>{link.href}</li>
              </div>
            )
          })}
        </ul>
        <p>storedUntil: {storedUntil}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PacketaStatusInfo
