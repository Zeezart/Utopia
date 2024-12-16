import  { useState } from 'react'
import { profilePicture } from '../assets/index'
import { useAuth } from '../ContextApi/UserAuthContext'
import usePreviewImage from '../Hooks/usePreviewImage'

type TProfileHeader = {
    displayEditModal: any
}

function ProfileHeader({displayEditModal}:TProfileHeader) {
    const {userData} = useAuth()
    const {selectedImage} = usePreviewImage()

  
  return (
    <div className="profile-details">
            <div className="profile-picture">
              <img src={selectedImage || profilePicture} alt="" />
            </div>

            <div className="profile-info">

              <div className='profile-name'>
                <h3>{userData?.username}</h3>
                <p>{userData?.bio}</p>
              </div>
              <div className="figures">
                <div className="post-count figure">
                  <h2>290</h2>
                  <p>Posts</p>
                </div>

                <div className="follower-count figure">
                  <h2>1800</h2>
                  <p>Followers</p>
                </div>

                <div className="following-count figure">
                  <h2>567</h2>
                  <p>Following</p>
                </div>
              </div>
              <div className="edit-button">
                <button onClick={displayEditModal}>Edit Profile</button>
                <button>View Activity</button>
              </div>
            </div>
            
        </div>
  )
}

export default ProfileHeader