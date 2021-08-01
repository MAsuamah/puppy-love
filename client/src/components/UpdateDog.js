import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useMutation } from '@apollo/client';
import { UPDATE_DOG } from '../utils/mutations';
import { useParams } from 'react-router-dom';

function UpdateDog() {
  const [show, setShow] = useState(false);
  const [dogFormData, setDogFormData] = useState({ name:'',breed: '', age: '', gender: ''})

  const {dogId} = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //initialize state validation
  const [ validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [updateDog] = useMutation(UPDATE_DOG);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDogFormData({ ...dogFormData, [name]: value });
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if(form.checkValidity()===false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try{

       await updateDog({
  variables: { id: dogId, name: dogFormData.name, gender: dogFormData.gender, breed: dogFormData.breed, age: parseInt(dogFormData.age) }
      });
      

    } catch(err){
      console.error(err);
    }
    handleClose(true);
  }
  
  return (
    <>
      <Button className='user-btn' onClick={() => setShow(true)} variant="dark">Update</Button>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Dog Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img id="update-img" src={require(`../assets/images/josh-hild-tkn_izTEVGo-unsplash.jpg`).default} alt="dog owner holding their dog over there shoulder"></img>
          {/* FORM TO UPDATE DOG*/}
          <Form>
            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
              <Form.Control type="name" name="name" placeholder={dogFormData.name} onChange={handleInputChange} value={dogFormData.name}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
              <Form.Control type="gender" name="gender" placeholder={dogFormData.gender} onChange={handleInputChange} value={dogFormData.gender}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
              <Form.Control type="age"name="age" placeholder={dogFormData.age} onChange={handleInputChange} value={dogFormData.age}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingBreed" label="Breed" className="mb-3">
              <Form.Control type="breed"name="breed" placeholder={dogFormData.breed} onChange={handleInputChange} value={dogFormData.breed}/>
            </FloatingLabel>

            {/* UPDATE DOG BUTTON */}
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateDog;