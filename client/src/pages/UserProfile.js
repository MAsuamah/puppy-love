import React, { useState, useEffect } from 'react';
import '../assets/styles/UserProfile.css'
import {FaRegUserCircle} from 'react-icons/fa';
import {FiMail} from 'react-icons/fi';
import {MdLocationCity} from 'react-icons/md';
import Button from 'react-bootstrap/Button'
import UpdateUser from '../components/UpdateUser';

const UserProfile = () => {

  return (
    <div className="user-profile">
      <div id="user-info">
        <div className="user-icons">  
          <p><FaRegUserCircle /> Username</p>
        </div>
        <div className="user-icons">    
          <p><FiMail /> Email</p>
        </div>
        <div className="user-icons">       
          <p><MdLocationCity /> City</p>
        </div>
      </div>
      <section className="dog-list"> 
        Dog List Here
      </section>
      <div className='update-user'>
        <UpdateUser />
        <Button className='user-btn' variant="danger">Delete Account</Button>       
      </div>
    </div>
  );
};

export default UserProfile;
