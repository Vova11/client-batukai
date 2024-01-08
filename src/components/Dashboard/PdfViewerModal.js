import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import customFetch from '../../utils/axios';

function PdfViewerModal({ pdfData, onClose }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>PDF Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          title="PDF Viewer"
          width="100%"
          height="600"
          src={pdfData}
        ></iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PdfViewerModal;