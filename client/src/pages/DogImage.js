import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Image, Form, Button} from 'react-bootstrap';
import useParams from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_DOG_IMAGE } from '..utils/queries';
import { ADD_IMAGE } from '..utils/mutations'
import '../assets/styles/DogPages.css'



const DogImage = () => {

    const { data } = useQuery(GET_DOG_IMAGE);
    const dogImage = data?.image || {};
    console.log("user data image", userData)
    const [ addImage, { error }] = useMutation(ADD_IMAGE);

     const handleRemoveImage = async (dogId) => {
         const token = Auth.loggedIn() ? Auth.getToken() : null;
         if (!token) {
             return false;
         }
        try {
              const { data } = await addImage ({ variables: (dogID) })
          }
          catch (e) {
            console.error(e);
        }
        };

    return (
        <>
    
            <Jumbotron fluid className='text-light bg-dark' class="user-icons">
                <Container>
                    {/* insert dog's name from data below */}
                    <h1> ${dog.name} Profile! </h1>
                </Container>
            </Jumbotron>

            <Container fluid class="image-container">
                <Row>
                    <Image src={dog.images} alt={`Profile Image for ${dog.name}`} fluid/>
                </Row>
            </Container>

            <Form fluid class="form-background">
                <h1>${dog.name}</h1>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" placeholder="Tell others how much you like their dog!" rows={3} />
                </Form.Group>

                <Button as="input" type="submit" value="Post"/>

            </Form>     

        </>
    )
};

export default DogImage;
