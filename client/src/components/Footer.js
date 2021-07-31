import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { ExternalLink } from 'react-external-link';

import '../assets/styles/Footer.css'
function AppFooter () {
    return (
        <>
        <Container className= 'footer'>
            <p id='footer-p'>Puppy-Love is created by:</p>
            <ExternalLink className = 'footerLink' href="https://andre-moseley-full-stack-dev.herokuapp.com/">
                <span>Andre Moseley</span>
            </ExternalLink>
            <ExternalLink className = 'footerLink' href="https://liaof.github.io/portfolio/">
                <span>Fanxi Liao</span>
            </ExternalLink>
            <ExternalLink className = 'footerLink' href="">
                <span>Marilyn Papadopoulos</span>
            </ExternalLink>
            <ExternalLink className = 'footerLink' href="">
                <span>Michelle Asuamah</span>
            </ExternalLink>
            <ExternalLink className = 'footerLink' href="">
                <span>Syed Murtaza Tirmizi</span>
            </ExternalLink>
        </Container>
        </>
      );
}

export default AppFooter;
