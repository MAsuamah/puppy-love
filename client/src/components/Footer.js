import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import '../assets/styles/Footer.css'
function AppFooter () {
    return (
        <>
        <Container id = 'footer'>
            <p>Puppy-Love is created by: </p>
            <Nav.Link as={Link} to ='https://andre-moseley-full-stack-dev.herokuapp.com/'>Andre Moseley</Nav.Link>
            <Nav.Link as={Link} to ='https://liaof.github.io/portfolio/'>Fanxi Liao</Nav.Link>
            <Nav.Link as={Link} to ='https://github.com/liaof'>Marilyn Papadopoulos</Nav.Link>
            <Nav.Link as={Link} to ='https://github.com/liaof'>Michelle Asuamah</Nav.Link>
            <Nav.Link as={Link} to ='https://github.com/liaof'>Syed Murtaza Tirmizi</Nav.Link>
        </Container>
        </>
      );
}

export default AppFooter;
