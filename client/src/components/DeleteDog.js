import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import{ DELETE_DOG } from '../utils/mutations';
import { useHistory} from 'react-router';


function DeleteDog() {

  const [deleteDog] = useMutation(DELETE_DOG);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const {dogId} = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (event) => {

      event.preventDefault();

      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {

       await deleteDog({
          variables: { id: dogId}
        });
      } catch (err) {
        console.error(err);
        
      }
      handleClose(true);
      history.push('/user-profile');
      location.reload();
  };

  return (
    <>
      <Button className='user-btn' variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete this pet?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Deleting your pet is a permanent action. Are you sure you wish to proceed?
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

export default DeleteDog;