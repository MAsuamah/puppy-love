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

import { ADD_COMMENT,DELETE_COMMENT } from '../utils/mutations';
import '../assets/styles/DogPages.css'
import {Link} from "react-router-dom";


const DogImage = () => {

    const {imageId} = useParams();

    const [commentFormData, setCommentFormData] = useState({ comment:'' });
    const [addComment] = useMutation(ADD_COMMENT);
    const [deleteComment] = useMutation(DELETE_COMMENT);

    const {loading, error, data} = useQuery(GET_DOG_IMAGE, {variables: {id: imageId}});
    
        if (loading) {
            return <h2>LOADING...</h2>;
        }

       if (!data.image) {
         throw new Error('You need to be logged in to view this page.');
       }

       const dogImage = data.image;

    const handleDogInputChange = (event) => {
        const { name, value } = event.target;
        setCommentFormData({ ...commentFormData, [name]: value });
        };
        
    const handleClick = async event => {
         event.preventDefault()

        try {
              const comment = await addComment ({ variables: {id: imageId, commentText: commentFormData.comment} });
          }
          catch (e) {
            console.error(e);
        }
        };

        const handleDelete = async (event) => {

            event.preventDefault();
            const commentVal = event.currentTarget;
      
            // check if form has everything (as per react-bootstrap docs)
      
            try {
      
                console.log(dogImage._id +"+"+commentVal.id)
             await deleteComment({
                variables: { imageId: dogImage._id, id: commentVal.id}
              });
            } catch (err) {
              console.error(err);
            }
        };

    return (
        <>
            <Container fluid="true" className="image-container">
                <Image src={dogImage.link}  alt={`Profile Image for dog`} fluid="true" thumbnail/>
                <Link className="pet-profile-link" key={dogImage.dogId} to={`/dog-profile/${dogImage.dogId}`}>View Profile</Link>
                <h1 className="header-styling">Dog's name: {dogImage.name}</h1>
                <div>{dogImage.comments && dogImage.comments.map((comment) => {
                return <div className="comments" key={comment._id}>
                        Owner: @{comment.username} <span><br></br></span> {comment.commentText} <span><br></br></span> 
                        ..commented at: {comment.createdAt} <Button id={comment._id} variant="danger" onClick={handleDelete}>X</Button></div>})}
                        
                    </div>
            
            <Form fluid="true" className="form-background">
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="image-text">Comment on </Form.Label>
                    <Form.Control as="textarea" type="comment" placeholder="Tell others how much you like their dog!" rows={3} name='comment' onChange={handleDogInputChange}
                    value={commentFormData.commentText}/>
                </Form.Group>

                <Button as="input" type="submit" value="Post" onClick={handleClick}/>

            </Form>    


            </Container>

            

        </>
    )
};

export default DogImage;
