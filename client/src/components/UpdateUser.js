import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import validator from 'validator';

function UpdateUser(props) {
  const [userFormData, setUserFormData] = useState({ email: props.userData.email, password: '', city: props.userData.city})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //initialize state validation
  const [ validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();

    if(validator.isEmail(userFormData.email) 
    && userFormData.email && userFormData.password && !validator.isNumeric(userFormData.city)) {

    try{

      const userUpdated = await updateUser({
        variables: { email: userFormData.email, password: userFormData.password, city: userFormData.city }
      });
      setShowAlert(false);
      handleClose(true);
    } catch(err){
      console.error(err);
    }
  } else {
    setShowAlert(true);
    event.preventDefault();
    event.stopPropagation();
  }

  }
  return (
    <>
      <Button className='user-btn' onClick={() => setShow(true)} variant="dark">Update Account</Button>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img id="update-img" src={require(`../assets/images/josh-hild-tkn_izTEVGo-unsplash.jpg`).default} alt="dog owner holding their dog over there shoulder"></img>
          {/* FORM TO UPDATE USER*/}
          <Form>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your dog details!
            </Alert>
            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
              <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleInputChange} value={userFormData.email}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleInputChange} value={userFormData.password}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingCity" label="City" className="mb-3">
              <Form.Control type="city"name="city" placeholder="City" onChange={handleInputChange} value={userFormData.city}/>
            </FloatingLabel>
            {/* UPDATE USER BUTTON */}
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateUser;