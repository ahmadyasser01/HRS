import React from 'react'
import   { ReactComponent as Illustration } from "../../../assets/doctors.svg"
import './Hero.css';
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className='container'>
    <div className='hero'>
      <div className='left-hero'>
       
          <h1 className='h1-hero'>Keep Your Health</h1>
          <p>Book appointments easy and fast</p>
        
        
        <button onClick={()=>{navigate('/specialities')}}>Book now</button>
       
      </div>
      <div className='right-hero'>
      <Illustration />
      </div>
    </div>
  </div>
  )
}

export default Hero
