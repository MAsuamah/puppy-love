import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/UserProfile.css'
import {FaRegUserCircle} from 'react-icons/fa';
import {FiMail} from 'react-icons/fi';
import {MdLocationCity} from 'react-icons/md';
import UpdateUser from '../components/UpdateUser';
import DeleteUser from '../components/DeleteUser';
import { useQuery } from '@apollo/client';
import {GET_ME} from '../utils/queries';
import Auth from '../utils/auth';

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

       if (!data) {
         throw new Error('You need to be logged in to view this page.');
       }

       const userData = data.me;
       

  return (
    <div className="user-profile">
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
      <section className="dog-list"> 
        {userData.dogs.map((dog) => {
          return <div dogId={dog._id}>{dog.name}</div>
        })}
      </section>
      <div className='update-user'>
        <UpdateUser  />
        <DeleteUser />      
      </div>
    </div>
  );
};

export default UserProfile;
