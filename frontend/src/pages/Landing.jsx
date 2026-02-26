import React from 'react'
import landing from '../assets/images/landing.png'

const Landing = () => {
  return (
    <div className='flex min-h-500 flex-col'>
      <div className='flex-5'>
        <img src={landing} alt="" />
        </div>
      <div className='flex-4'>centralized</div>
      <div className='flex-4'>chat</div>
      <div className='flex-4'>ai summary</div>
    </div>
  )
}

export default Landing
