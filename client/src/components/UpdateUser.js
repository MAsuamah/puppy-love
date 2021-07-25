import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function UpdateUser() {
  const [lgShow, setLgShow] = useState(false);

  const updateImg = {
    width: '700px',
    marginBottom: '15px',
    marginLeft: '35px'
  }

  return (
    <>
      <Button className='user-btn' onClick={() => setLgShow(true)} variant="dark">Update Account</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={updateImg} src={require(`../assets/images/josh-hild-tkn_izTEVGo-unsplash.jpg`).default} alt="dog owner holding their dog over there shoulder"></img>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>

            <FloatingLabel controlId="floatingCity" label="City" className="mb-3">
              <Form.Control type="city" placeholder="City" />
            </FloatingLabel>

            <Button variant="dark" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateUser;