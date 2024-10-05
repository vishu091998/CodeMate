import React from 'react'
import { Link } from 'react-router-dom'
import { FaSadCry } from 'react-icons/fa'
import { CgDanger } from "react-icons/cg";
import images from '../assets/219918-P1D0HC-507.jpg'


function Fallback ({ error }) {
  console.log(error)
  return (
    <div className='fallback-body' >
        <img src={images} alt='404 Image' className='fallback-img'/>
        <Link to='/home' className='fallback-btn btn btn-light'>Go Home!</Link>
    </div>
  )
}

export default Fallback
