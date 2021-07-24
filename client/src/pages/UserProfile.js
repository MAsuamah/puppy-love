import React, { useState, useEffect } from 'react';
import '../assets/styles/UserProfile.css'
import {FaRegUserCircle} from 'react-icons/fa';
import {FiMail} from 'react-icons/fi';
import {MdLocationCity} from 'react-icons/md';

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
      
      </section>
    </div>
  );
};

export default UserProfile;
