import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Image, Form, Button} from 'react-bootstrap';

import Auth from '../utils/auth';

const SavedBooks = () => {

    return (
        <>
    
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    {/* insert dog's name from data below */}
                    <h1> ${dog.name} Profile! </h1>
                </Container>
            </Jumbotron>

            <Container>
                <Row>
                    <Image src={dog.image} alt={`Profile Image for ${dog.name}`} fluid/>
                </Row>
            </Container>

            <Form>
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