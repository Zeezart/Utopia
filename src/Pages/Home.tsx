import React, { useState } from 'react'
import {useAuth} from "../ContextApi/UserAuthContext"
import Navbar from '../Component/Navbar'
import {profilePicture} from "../assets/index"

function HomePage(){

  const { userData}= useAuth()
      
  return (
    <div id="home-page">
        <Navbar />

        <div className='feed'>
          <div className="post">
            <div className='post-owner-tab'>
              <div className='post-owner-info'>
                <div>
                  <img src={profilePicture}/>
                </div>
                <p>{userData?.username}</p>
              </div>
              <i>icon</i>
            </div>

            <div className='posted-image'>
              <img src={profilePicture}/>
            </div>
            <div className='icon-comment-tab'>
              <div className='post-icons'>
                <i>like</i>
                <i>comment</i>
                <i>save</i>
              </div>
                <p>128 likes</p>
              <div>
                <p>caption</p>
              </div>
            </div>
          </div>
        </div>

        <div className="extra">
          <h1>Extra</h1>
        </div>
    </div>
  )
}

export default HomePage