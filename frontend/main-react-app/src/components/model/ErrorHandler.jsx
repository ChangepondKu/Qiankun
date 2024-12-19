import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ErrorHandler({ error, onClose }) {
  return (
    <Modal show={!!error} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{error}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
