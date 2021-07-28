import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useMutation, useQuery } from '@apollo/client';
import{ DELETE_USER } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

function DeleteUser() {
  const [deleteUser] = useMutation(DELETE_USER);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {loading, error, data} = useQuery(GET_ME);
  const handleDelete = async (event) => {
    
    console.log(data.me._id);
      event.preventDefault();

      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {
       await deleteUser({
          variables: { _id: data.me_id}
        });

      } catch (err) {
        console.error(err);
        
      }
      handleClose(true);
  };

  return (
    <>
      <Button className='user-btn' variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to delete your account? This is a permanent action.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;