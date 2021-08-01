import React, { useState, useEffect } from 'react';
import '../assets/styles/UserProfile.css'
import {FaRegUserCircle} from 'react-icons/fa';
import {BiBone} from 'react-icons/bi';
import {FiMail} from 'react-icons/fi';
import {MdLocationCity} from 'react-icons/md';
import UpdateUser from '../components/UpdateUser';
import DeleteUser from '../components/DeleteUser';
import { useQuery } from '@apollo/client';
import {GET_ME} from '../utils/queries';
import Auth from '../utils/auth';
import {Link} from "react-router-dom";
import { Container, Row, Col, Image, Button} from 'react-bootstrap';

const UserProfile = () => {

      // set state for alert
      //const [showAlert, setShowAlert] = useState(false);
      const {loading, error, data} = useQuery(GET_ME);

      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      if (loading) {
        return <h2>LOADING...</h2>;
      }

       if (!data.me) {
         throw new Error('You need to be logged in to view this page.');
       }

       const userData = data.me;

  return (
    <>
    <Container fluid className="user-profile" >
      <div id="user-info">
        <div className="user-icons">  
          <p><FaRegUserCircle /> {userData.username}</p>
        </div>
        <div className="user-icons">    
          <p><FiMail /> {userData.email}</p>
        </div>
        <div className="user-icons">       
          <p><MdLocationCity /> {userData.city}</p>
        </div>
      </div>

      <div className="dog-list"> 
        <ul>
         {userData.dogs.map((dog) => {
          return (<li key={dog._id}><Link key={dog._id} to={`/dog-profile/${dog._id}`}><BiBone/>{dog.name}'s Profile<BiBone/></Link></li>);
        })}
        </ul>
      </div>
      
      <div className='update-user'>
        <UpdateUser />
        <DeleteUser />      
      </div>
    </Container>
    </>
    )
};

export default UserProfile;
