import React from 'react'
import PostPetSection from './PostPetSection'
import PreRegister from '../PreRegister/PreRegister'

const Services = () => {
  return (
    <div className='main-container'>
        <div className='adopt-pet'>
            <PreRegister/>
        </div>
        <div className='post-pet'>
            <PostPetSection/>
        </div>
    </div>
  )
}

export default Services
