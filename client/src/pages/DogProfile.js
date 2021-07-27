import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Image, Button} from 'react-bootstrap';
import { QUERY_GET_DOG, ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import '../assets/styles/DogPages.css'
import { FaDog } from "react-icons/fa";


import Auth from '../utils/auth';

const DogProfile = () => {

    const { data } = useQuery(QUERY_GET_DOG);
    const [addFriend] = useMutation(ADD_FRIEND);
    const removeFriend = useMutation(REMOVE_FRIEND);
    
    const addFriendClick = async () => {
        try {
            addFriend({
                variables: { id: user._id }
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    const removeFriendClick = async () => {
        try {
            removeFriend({
                variables: { id: user._id }
            });
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Row>

                <Col>

                    <Container fluid class="user-icons" class="profile-container">
                        {/* insert dog's name from data below */}
                        <h1><FaDog/> ${dog.name}</h1>
                        <Button as="input" type="button" value="Add Friend"/>
                    </Container>

                    <Container fluid class="profile-container">
                        <h2>Gender: ${dog.gender}</h2>
                        <h2>Age: ${dog.age}</h2>
                        <h2>Breed: ${dog.breed}</h2>
                        <h2>City: ${user.location}</h2>
                    </Container>

                </Col>

                <Col fluid>

                    <Container fluid class="profile-container">
                        <h1>Friend List</h1>
                        <Button as="input" type="button" value="Delete Friend"/>
                    </Container>

                    <Container fluid>
                        <h2>${dog.friends}</h2>
                    </Container>

                </Col>

            </Row>

            <Container fluid class="image-container">

                <Row class="row-images" id="top-row-images">

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                </Row>

                <Row class="row-images">
                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                    <Col>
                        <Image class="dog-images" src={dog.images} alt={`Images of ${dog.name}`} thumbnail/>
                    </Col>

                </Row>

            </Container>  

        </>
    )
};

export default DogProfile;
