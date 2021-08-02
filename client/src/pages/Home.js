import React from 'react';
import '../assets/styles/Home.css'
import {BsHeartHalf} from 'react-icons/bs'
import {FaArrowAltCircleDown} from 'react-icons/fa'
import { useQuery} from '@apollo/client';
import Auth from '../utils/auth';
import {GET_ALL_DOGS, GET_ALL_IMAGES} from '../utils/queries'
import {Link} from "react-router-dom";
import Image from 'react-bootstrap/Image';

function Home() {

  const {loading, error, data} = useQuery(GET_ALL_DOGS);
  const {...getDogImages} = useQuery(GET_ALL_IMAGES);

      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (loading) {
        return <h2>LOADING...</h2>;
      }
      
       if (!data) {
         throw new Error('You need to be logged in to view this page.');
       }

       const allDogsData = data.allDogs;

       if (getDogImages.loading) {
        return <h2>LOADING...</h2>;
      }
      
       if (!getDogImages.data) {
         throw new Error('You need to be logged in to view this page.');
       }

       const allDogImages = getDogImages.data.allImages;

  return (
    <div className="home-dash">
      <div className="hero-image">
        <h1 id="hero-tagline">Find Your Next Playdate <br/>
          <BsHeartHalf />
        </h1>
        <p id="meet-pups"><FaArrowAltCircleDown id="pup-arrow"/> Meet Some Pups</p>
      </div>
  {/*     <h1 className="header-styling">Gallery!</h1> */}
      <div className="dog-members">
        <ul className="dog-ul">
          {token && allDogImages.map((images => {
              let user = allDogsData.filter(user => user._id == images.dogId)

          return (<li className="dog-li" key={images._id}><Link key={`/dog-image/${images._id}`} to={`/dog-image/${images._id}/${user.username}`}>
          <Image className="dog-images" src={images.link} alt={`Images of dog`} key={`/dog-image/${images._id}`} thumbnail/>
          </Link></li>);
        }))}
        </ul>
      </div>
    </div>
  )
}

export default Home;