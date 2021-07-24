import React from 'react';
import '../assets/styles/Home.css'
import {BsHeartHalf} from 'react-icons/bs'

function Home() {
  return (
    <div className="hero-image">
      <h1 id="hero-tagline">Find Your Next Playdate <br/>
        <BsHeartHalf />
      </h1>
    </div>
  )
}

export default Home;