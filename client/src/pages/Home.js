import React from 'react';
import '../assets/styles/Home.css'
import {BsHeartHalf} from 'react-icons/bs'
import {FaArrowAltCircleDown} from 'react-icons/fa'

function Home() {
  return (
    <div className="hero-image">
      <h1 id="hero-tagline">Find Your Next Playdate <br/>
        <BsHeartHalf />
      </h1>
      <p id="meet-pups"><FaArrowAltCircleDown id="pup-arrow"/> Meet Some Pups</p>
    </div>
  )
}

export default Home;