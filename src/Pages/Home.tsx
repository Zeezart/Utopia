import React, { useState } from 'react'
import {useAuth} from "../ContextApi/UserAuthContext"
import Navbar from '../Component/Navbar'
import {profilePicture} from "../assets/index"
import ExtraTab from '../Component/ExtraTab'
import ProfilePosts from '../Component/ProfilePosts'
import useGetFeedPosts from '../Hooks/useGetFeedPosts'
import FeedPosts from '../Component/Feedposts'

function HomePage(){

  const { userData}= useAuth()
  const {isFetching, posts} = useGetFeedPosts()
      
  return (
    <div id="home-page">
        <Navbar />

        <div className='feed'>
          <div className="post">
            {!isFetching && posts.length > 0 && posts.map((post) => 
               <FeedPosts post={post} key={post.id} />
              //<ProfilePosts post={post} key={post.id} />
            )}
          </div>
        </div>

        <ExtraTab />
    </div>
  )
}

export default HomePage