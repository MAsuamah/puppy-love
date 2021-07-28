import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Jumbotron from 'react-bootstrap/Jumbotron'
import {useParams} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_DOG_IMAGE } from '../utils/queries';
import '../assets/styles/DogPages.css'


const DogImage = () => {

    const [commentFormData, setCommentFormData] = useState({ commentText });
    const [getDog] = useQuery(GET_DOG_IMAGE);
    const [addComment] = useMutation(ADD_COMMENT);
    const {imageId} = useParams();
    const {loading, error, data} = getDog({variables: imageId});
    const dogImage = data;

    const handleDogInputChange = (event) => {
        const { name, value } = event.target;
        setCommentFormData({ commentText, [name]: value });
        };

    const handleClick = async event => {
         event.preventDefault()

         const token = Auth.loggedIn() ? Auth.getToken() : null;
         if (!token) {
             return false;
         }
        try {
              const { comment } = await addComment ({ variables: {id: imageId, commentFormData} });
          }
          catch (e) {
            console.error(e);
        }
        };

    return (
        <>
            <Container fluid class="image-container">
                <Image src={dogImage.link}  alt={`Profile Image for dog`} fluid/>

                <div>{comment.map((comment) => {
                return <div>{comment.username} + {comment.commentText} + {comment.createdAt} +</div>})}</div>
            </Container>

            <Form fluid class="form-background">
                <h1>{dog.name}</h1>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" placeholder="Tell others how much you like their dog!" rows={3} name='comment' onChange={handleDogInputChange}
            value={commentFormData.commentText}/>
                </Form.Group>

                <Button as="input" type="submit" value="Post" onClick={handleClick}/>

            </Form>     

        </>
    )
};

export default DogImage;
