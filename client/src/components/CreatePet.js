import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useMutation } from '@apollo/client';
import { ADD_DOG } from '../utils/mutations';
import { useHistory} from 'react-router';

function CreatePet() {

  //Styling for Submit Button
  const submit = {
    marginTop: '10px'
  }

  // set initial form state
  const [dogFormData, setDogFormData] = useState({ name: '', breed: '', gender: '', age: '' });
  
 // implement addUser Mutation
   const [addDog] = useMutation(ADD_DOG);

   // set state for form validation
  const [validated] = useState(false);

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const handleDogInputChange = (event) => {
    const { name, value } = event.target;
    setDogFormData({ ...dogFormData, [name]: value });
  };

  const handleDogFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addDog({variables: { ...dogFormData, age: parseInt(dogFormData.age)}
      });

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setDogFormData({
      name: '',
      breed: '',
      gender: '',
      age: ''
    });

      history.push('/user-profile');
      location.reload();
  };


  return (
    <Form noValidate validated={validated} onSubmit={handleDogFormSubmit}>
      <FloatingLabel controlId="floatingName" label="Pet Name" className="mb-3">
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your dog details!
        </Alert>

        <Form.Control type="petName" name='name' onChange={handleDogInputChange}
            value={dogFormData.name} required placeholder="Name" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingBreed" label="Breed" className="mb-3">
        <Form.Control type="breed" name='breed' onChange={handleDogInputChange}
            value={dogFormData.breed} placeholder="Breed" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
        <Form.Control type="gender" name='gender' onChange={handleDogInputChange}
            value={dogFormData.gender} placeholder="Gender" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
        <Form.Control type="age" name='age' onChange={handleDogInputChange}
            value={dogFormData.age} placeholder="age" />
      </FloatingLabel>
    
      <Button variant="dark" type="submit">
        Add Pet!
      </Button>
    </Form>
  );
}

export default CreatePet;