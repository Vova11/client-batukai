import React from 'react'
import {  Modal, Button } from 'react-bootstrap'
import PdfViewer from './PdfViewer'

const PacketaLabelPrint = ({show, handleClose, id, dataUri}) => {
  
  
  // const print = () => {
  //   // Create a reference to the iframe
  //   const iframe = document.getElementById('pdfIframe');

  //   // Check if the iframe is loaded
  //   if (iframe && iframe.contentWindow) {
  //     // Trigger the print dialog for the iframe content
  //     iframe.contentWindow.print();
  //   } else {
  //     console.error('The iframe is not loaded.');
  //   }
  // };
  
  return (
    <Modal show={show} onHide={handleClose} id='pdfModal' size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order #{id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PdfViewer id={id} dataUri={dataUri}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PacketaLabelPrint
