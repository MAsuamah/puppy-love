import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import { GET_SINGLE_DOG, GET_USER, GET_ME } from '../utils/queries';
import '../assets/styles/DogPages.css'
import { FaDog } from "react-icons/fa";
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import UpdateDog from '../components/UpdateDog';
import DeleteDog from '../components/DeleteDog';

const DogProfile = () => {

    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
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

    return (
        <>

                    <Container fluid className="profile-container">
                        <h1><FaDog/> {dogDetails.name}</h1>
                        <h2>Gender: {dogDetails.gender}</h2>
                        <h2>Age: {dogDetails.age}</h2>
                        <h2>Breed: {dogDetails.breed}</h2>
                        <h2>Owner: {dogDetails.username}</h2>
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
                    <Col>
                        <Image className="dog-images" src={image.link} alt={`Images of dog`} thumbnail/>
                        <div link={`/dog-image/${image._id}`}></div>
                    </Col>);
                    })
                    }

                </Row>

            </Container>  

        </>
    )
};

export default DogProfile;
