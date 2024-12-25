import React, { useState } from 'react'
import {useAuth} from "../ContextApi/UserAuthContext"
import Navbar from '../Component/Navbar'
import {profilePicture} from "../assets/index"
import ExtraTab from '../Component/ExtraTab'
import ProfilePosts from '../Component/ProfilePosts'

function HomePage(){

  const { userData}= useAuth()
      
  return (
    <div id="home-page">
        <Navbar />

        <div className='feed'>
          <div className="post">
            <ProfilePosts />
          </div>
        </div>

        <ExtraTab />
    </div>
  )
}

export default HomePage