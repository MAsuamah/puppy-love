import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import { ADD_FRIEND, REMOVE_FRIEND, DELETE_IMAGE } from '../utils/mutations';
import { GET_SINGLE_DOG, GET_USER, GET_ME } from '../utils/queries';
import '../assets/styles/DogPages.css'
import { FaDog } from "react-icons/fa";
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import UpdateDog from '../components/UpdateDog';
import DeleteDog from '../components/DeleteDog';
import UploadImage from '../components/UploadImage';
import {Link} from "react-router-dom";

const DogProfile = () => {

    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    const [deleteImage] = useMutation(DELETE_IMAGE);
    const {dogId} = useParams();

    function dogInfo (dogId){
        const {...dogQueryResponse} = useQuery(GET_SINGLE_DOG, {
            variables: { id: dogId },
        });
        if (dogQueryResponse.loading) {
            return <h2>LOADING...</h2>;
        }
        if (!dogQueryResponse.data.dog) {
            throw new Error('You need to be logged in to view this page.');
        }
        return dogQueryResponse.data.dog;
    }
    const dogDetails = dogInfo(dogId);

    function myInfo (){
        const {...myQueryResponse} = useQuery(GET_ME);
        if (myQueryResponse.loading) {
            return <h2>LOADING...</h2>;
        }
        if (!myQueryResponse.data.me) {
            throw new Error('You need to be logged in to view this page.');
        }
        return myQueryResponse.data.me;
    }
    const myDetails = myInfo();

    const handleImageDelete = async (event) => {

        event.preventDefault();
        const imageVal = event.currentTarget;
  
        // check if form has everything (as per react-bootstrap docs)
  
        try {

         await deleteImage({
            variables: { dogId: dogDetails._id, id: imageVal.id}
          });
        } catch (err) {
          console.error(err);
        }
    };

    /*-------------------------------------

    const [userQueryResponse, {loading, error, data}] = useLazyQuery(GET_USER);

        if (loading) {
            return <h2>LOADING...</h2>;
        }
  
    
    const addFriendClick = async () => {
        try {
            await addFriend({
                variables: { user1: userDetails._id, user2: myDetails._id }
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    const removeFriendClick = async () => {
        try {
            await removeFriend({
                variables: { user1: userDetails._id, user2: myDetails._id }
            });
        }
        catch (e) {
            console.error(e);
        }
    }

    -------------------------------------*/

    return (
        <>

                    <Container fluid className="profile-container">
                        <h1><FaDog/> {dogDetails.name}</h1>
                        <h2>Gender: {dogDetails.gender}</h2>
                        <h2>Age: {dogDetails.age}</h2>
                        <h2>Breed: {dogDetails.breed}</h2>
                        <h2>Owner: {dogDetails.username}</h2>
                        
                        <UploadImage dogDetails={dogDetails.name}/>
                        <UpdateDog /><DeleteDog />
                    </Container>

                    {/* <Button as="input" type="button" value="Show Owner" onClick={() =>userQueryResponse({variables: {username: dogDetails.username}})}/>
                    {data && data.username && myDetails.username != data.username && 

                    <Container fluid className="user-icons" className="profile-container"> 
                        <h2>City: {data.city }</h2>
                        <h1>Friend List</h1>
                        <Button as="input" type="button" value="Add Friend"/>

                        <Button as="input" type="button" value="Delete Friend"/>
                    </Container>
                    }
                    {data && data.username &&myDetails.username == data.username && data.friends && 
                    <Container fluid>
                        <ul>{data.friends.map((friends)=>{
                            <li>{friends.username}</li>
                        })}</ul>
                    </Container>} */}

            <Container fluid className="image-container">

                <Row className="row-images" id="top-row-images">
                    {(dogDetails.images) &&

                    dogDetails.images.map((image) => {
                        return (
                    <Col key={`/dog-image/${image._id}-col`}>
                        <Link key={`/dog-image/${image._id}-link`} to={`/dog-image/${image._id}`}>
                        <Image className="dog-images" src={image.link} alt={`Images of dog`} key={`/dog-image/${image._id}-image`} thumbnail/>
                        </Link>
                        <Button id={image._id} variant="danger" onClick={handleImageDelete} key={`/dog-image/${image._id}-delButton`}>X</Button>
                    </Col>);
                    })
                    }

                </Row>

            </Container>  

        </>
    )
};

export default DogProfile;
