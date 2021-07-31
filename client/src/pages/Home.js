import React from 'react';
import '../assets/styles/Home.css'
import {BsHeartHalf} from 'react-icons/bs'
import {FaArrowAltCircleDown} from 'react-icons/fa'
import { useQuery} from '@apollo/client';
import Auth from '../utils/auth';
import {GET_ALL_DOGS} from '../utils/queries'
import {Link} from "react-router-dom";

function Home() {

  const {loading, error, data} = useQuery(GET_ALL_DOGS);

      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (loading) {
        return <h2>LOADING...</h2>;
      }
      
       if (!data) {
         throw new Error('You need to be logged in to view this page.');
       }

       const allDogsData = data;

  return (
    <div>
      <div className="hero-image">
        <h1 id="hero-tagline">Find Your Next Playdate <br/>
          <BsHeartHalf />
        </h1>
        <p id="meet-pups"><FaArrowAltCircleDown id="pup-arrow"/> Meet Some Pups</p>
      </div>
      <div className="dog-members">
          <h1>Dog Members Here</h1>
          {token && allDogsData.allDogs.map((dogs => {
          return (<li><Link key={dogs._id} to={`/dog-profile/${dogs._id}`} target>{dogs.name}'s Profile</Link><span>Images coming soon..!</span></li>);
        }))};
      </div>
    </div>
  )
}

export default Home;