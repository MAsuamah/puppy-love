import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function CreatePet() {

  return (
    <Form>
      <FloatingLabel controlId="floatingName" label="Pet Name" className="mb-3">
        <Form.Control type="petName" placeholder="Name" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingBreed" label="Breed" className="mb-3">
        <Form.Control type="breed" placeholder="Breed" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
        <Form.Control type="gender" placeholder="Gender" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
        <Form.Control type="age" placeholder="age" />
      </FloatingLabel>
    
      <Button variant="dark" type="submit">
        Add Pet!
      </Button>
    </Form>
  );
}

export default CreatePet;