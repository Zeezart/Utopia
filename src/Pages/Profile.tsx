import  { useState } from 'react'
import Navbar from '../Component/Navbar'
import { profilePicture } from '../assets/index'
import { useAuth } from '../ContextApi/UserAuthContext'
import EditProfile from '../Modals/EditProfile'
import usePreviewImage from '../Hooks/usePreviewImage'

function Profile() {

  const {userData} = useAuth()
  const [editModal, setEditModal] = useState(false)
  const {selectedImage} = usePreviewImage()

  function displayEditModal(){
    setEditModal(true)
  }
  

  return (
    <div id="profile-page">
      <Navbar />
      <div className="profile">
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

        <div className="posts-section">
          <div className="post-identifier">
            <p>Posts</p>
            <p>Saved</p>
          </div>

          <div className="posts">
            <div className='post'>
              <img src={profilePicture}/>
            </div>
            <div className='post'>
              <img src={profilePicture}/>
            </div>
            <div className='post'>
              <img src={profilePicture}/>
            </div>
            
            
          </div>
        </div>

      {editModal && <EditProfile username={userData.username} bio={userData.bio} setEditModal={setEditModal}/>}
      </div>
    </div>
  )
}

export default Profile