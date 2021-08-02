import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useMutation } from '@apollo/client';
import { ADD_DOG } from '../utils/mutations';
import { useHistory} from 'react-router';
import validator from 'validator';

function CreatePet() {

  //Styling for Submit Button
  const submit = {
    marginTop: '10px'
  }

  const [dogFormData, setDogFormData] = useState({ name: '', breed: '', gender: '', age: '' });
  
   const [addDog] = useMutation(ADD_DOG);

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const handleDogInputChange = (event) => {
    const { name, value } = event.target;
    setDogFormData({ ...dogFormData, [name]: value });
  };

  const handleDogFormSubmit = async (event) => {
    event.preventDefault();

    if(validator.isNumeric(parseInt(dogFormData.age))
    && validator.isAlpha(dogFormData.breed) && validator.isAlpha(dogFormData.gender) && validator.isAlpha(dogFormData.name)
    && dogFormData.age && dogFormData.breed && dogFormData.gender && dogFormData.name) {

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
    
    } else {
      setShowAlert(true);
      event.preventDefault();
      event.stopPropagation();
    }
  };



  return (
    <Form noValidate validated={validated} onSubmit={handleDogFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your dog details!
        </Alert>

      <FloatingLabel controlId="floatingName" label="Pet Name" className="mb-3">

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