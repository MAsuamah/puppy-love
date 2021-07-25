import React from 'react';
import '../assets/styles/Home.css'
import {BsHeartHalf} from 'react-icons/bs'
import {FaArrowAltCircleDown} from 'react-icons/fa'

function Home() {
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
      </div>
    </div>
  )
}

export default Home;