import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import Modal from 'react-bootstrap/Modal'
import { FaPaw } from 'react-icons/fa';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import CreatePet from './CreatePet';
import '../assets/styles/Navbar.css'

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state for Login/SignUp
  const [showModal, setShowModal] = useState(false);
  // set modal display state for Create Pet
  const [showPetModal, setShowPetModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Puppy Love <FaPaw />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ms-auto'>
              {/* if user is logged in show saved books and logout */}
             {/*  {Auth.loggedIn() ? ( */}
                <>

                {/* MODAL SET FOR ADDING PETS STARTS*/}
                  <Nav.Link onClick={() => setShowPetModal(true)}>Add a Pet</Nav.Link>

                  <Modal
                    size="lg"
                    show={showPetModal}
                    onHide={() => setShowPetModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Add a Pet
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <img id="create-pet-img" src={require(`../assets/images/t-r-photography-TzjMd7i5WQI-unsplash.jpg`).default} alt="puppy peeking over a bed"></img>
                      <CreatePet />
                    </Modal.Body>
                  </Modal>
                  {/* MODAL SET FOR ADDING PETS ENDS */}

                  <Nav.Link as={Link} to='/user-profile'>Your Profile</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              {/* ) : ( */}
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
             {/*  )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
