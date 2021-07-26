import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Image, Button} from 'react-bootstrap';
import { QUERY_GET_DOG, ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
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

                <Container>

                    <Container>
                        {/* insert dog's name from data below */}
                        <h1> ${dog.name}</h1>
                        <Button as="input" type="button" value="Add Friend"/>
                    </Container>

                    <Container>
                        <h2>Gender: ${dog.gender}</h2>
                        <h2>Age: ${dog.age}</h2>
                        <h2>Breed: ${dog.breed}</h2>
                        <h2>City: ${dog.location}</h2>
                    </Container>

                </Container>

                <Container>

                    <Container>
                        <h1>Friend List</h1>
                        <Button as="input" type="button" value="Delete Friend"/>
                    </Container>

                    <Container>
                        <h2>${dog.friend}</h2>
                    </Container>

                </Container>

            </Row>

            <Container>

                <Row>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                </Row>

                <Row>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                    <Image src={dog.image} alt={`Images of ${dog.name}`} thumbnail/>
                </Row>

            </Container>  

        </>
    )
};

export default DogProfile;
