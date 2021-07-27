import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Jumbotron from 'react-bootstrap/Jumbotron'
import useParams from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_DOG_IMAGE } from '..utils/queries';
import { ADD_IMAGE } from '..utils/mutations'
import '../assets/styles/DogPages.css'
import { FaDog } from "react-icons/fa";


const DogImage = () => {

    const { data } = useQuery(GET_DOG_IMAGES);
    const dogImages = data?.images || [];
    //console.log("user data image", userData)
 
    console.log(dogImages);
    const dog = {name: 'Pepper'}
    const handleClick = async event => {
         event.preventDefault()

         const token = Auth.loggedIn() ? Auth.getToken() : null;
         if (!token) {
             return false;
         }
        try {
              const { data } = await addComment ({ variables: (commentText) })
          }
          catch (e) {
            console.error(e);
        }
        };

    return (
        <>
            <Container class="user-icons">
                insert dog's name from data below
                <h1><FaDog/> {dog.name} Profile! </h1>
            </Container>

            <Container fluid class="image-container">
                <Row>
                    {dogImages?.map(dog => (
                         <Image src={dog.image} alt={`Profile Image for ${dog.name}`} fluid/>
                    ))}
                   
                </Row>
            </Container>

            <Form fluid class="form-background">
                <h1>{dog.name}</h1>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" placeholder="Tell others how much you like their dog!" rows={3} />
                </Form.Group>

                <Button as="input" type="submit" value="Post" onClick={handleClick}/>

            </Form>     

        </>
    )
};

export default DogImage;
