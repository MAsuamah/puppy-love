import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import{ DELETE_USER } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { Form } from 'react-bootstrap';

function DeleteUser() {
  const [deleteUser] = useMutation(DELETE_USER);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ password: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {loading, error, data} = useQuery(GET_ME);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormData({ password: value });
  };

  const handleDelete = async (event) => {
      event.preventDefault();

      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {

       await deleteUser({
          variables: { id: data.me._id, password: formData.password}
        });
        // await deleteUser({
        //    _id: data.me_id, password: formData.password
        // });

      } catch (err) {
        console.error(err);
        
      }
      handleClose(true);
      //Auth.logout;
      setFormData({
        password: ''
      });

      Auth.logout();
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
          <Modal.Title>Delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            Deleting your account is a permanent action. Please enter your password to proceed.
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={formData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose} >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;