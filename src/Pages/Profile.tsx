import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";
import EditProfile from "../Modals/EditProfile";
import ProfileHeader from "../Component/ProfileHeader";
import useGetUserProfile from "../Hooks/useGetUserProfile";
import { profilePicture } from '../assets/index'
import ExtraTab from "../Component/ExtraTab";
import EachPost from "../Component/EachPost";
import { useGetPost } from "../ContextApi/PostContext";
import ProfilePosts from "../Component/ProfilePosts";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [editModal, setEditModal] = useState(false);
  const { isLoading, userProfile } = useGetUserProfile(username);
  // const { posts } = useGetPost()

  const displayEditModal = () => {
    setEditModal(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!userProfile) return <p>User not found.</p>;

  return (
    <div id="profile-page">
      <Navbar />
      <div className="profile">
        <ProfileHeader displayEditModal={displayEditModal} />
        <div className="posts-section">
          <div className="post-identifier">
            <p>Posts</p>
            <p>Saved</p>
          </div>
          <div className="posts">
             <ProfilePosts />
          </div>
        </div>
      </div>
      {editModal && <EditProfile username={userProfile.username} bio={userProfile.bio} setEditModal={setEditModal} />}
      <ExtraTab />
    </div>
  );
};

export default Profile;
