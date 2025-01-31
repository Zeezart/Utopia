import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";
import EditProfile from "../Modals/EditProfile";
import ProfileHeader from "../Component/ProfileHeader";
import useGetUserProfile from "../Hooks/useGetUserProfile";
import ExtraTab from "../Component/ExtraTab";
import ProfilePosts from "../Component/ProfilePosts";
import MobileNavbar from "../Component/MobileNavbar";
import LoadingPage from "../Component/LoadingPage";
import UserNotFoundPage from "./UserNotFound";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [editModal, setEditModal] = useState(false);
  const { isLoading, userProfile } = useGetUserProfile(username);
  // const { posts } = useGetPost()

  const displayEditModal = () => {
    setEditModal(true);
  };

  if (isLoading) return <LoadingPage />;
  if (!userProfile) return <UserNotFoundPage />;

  return (
    <div id="profile-page">
      <Navbar />
      
      <div className="profile">
        <ProfileHeader displayEditModal={displayEditModal} />
        <div className="posts-section">
          <div className="post-identifier">
            <p>Posts</p>
            {/* <p>Saved</p> */}
          </div>
          <div className="posts">
             <ProfilePosts />
          </div>
        </div>
      </div>
      {editModal && <EditProfile username={userProfile.username} bio={userProfile.bio} setEditModal={setEditModal} />}
      <ExtraTab />
      <MobileNavbar />
    </div>
  );
};

export default Profile;
