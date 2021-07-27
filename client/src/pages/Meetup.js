import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Image, Form, Button} from 'react-bootstrap';

import Auth from '../utils/auth';

const Meetup = () => {

    return (
        <>
    
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    {/* insert dog's name from data below */}
                    <h1> Meetup Organizer</h1>
                </Container>
            </Jumbotron>

            <Form fluid id="form-background">
                <h1>${dog.name}</h1>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Time</Form.Label>
                    <Form.Control as="textarea" placeholder="07:00PM EST" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="textarea" placeholder="High Park, Toronto, Ontario" rows={3} />
                </Form.Group>

                <Button as="input" type="submit" value="Post"/>

            </Form>     

        </>
    )
};

export default Meetup;