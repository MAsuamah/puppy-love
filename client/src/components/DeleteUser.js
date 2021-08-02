import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import{ DELETE_USER } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { Form } from 'react-bootstrap';
import { useHistory} from 'react-router';
import Alert from 'react-bootstrap/Alert';

function DeleteUser() {
  const [deleteUser] = useMutation(DELETE_USER);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({ password: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {loading, error, data} = useQuery(GET_ME);

  const history = useHistory();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormData({ password: value });
  };

  const handleDelete = async (event) => {
      event.preventDefault();

      if(formData.password) {

      try {

       await deleteUser({
          variables: { id: data.me._id, password: formData.password}
        });

      } catch (err) {
        console.error(err);
        
      }
      setShowAlert(false);
      handleClose(true);

      setFormData({
        password: ''
      });
      history.push('/');
      Auth.logout();
    } else {
      setShowAlert(true);
      event.preventDefault();
      event.stopPropagation();
    }
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
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your dog details!
            </Alert>
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