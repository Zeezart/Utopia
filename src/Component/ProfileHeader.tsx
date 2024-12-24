import { profilePicture } from "../assets/index";
import { useAuth } from "../ContextApi/UserAuthContext";
import { useGetUser } from "../ContextApi/GetUserProfileContext";
import useFollowUser from '../Hooks/useFollowUser'

type TProfileHeader = {
  displayEditModal: () => void;
};

const ProfileHeader = ({ displayEditModal }: TProfileHeader) => {
  const { userData, currentUser } = useAuth();
  const { userProfile } = useGetUser();

  const myProfilePageAuth =
    currentUser && userData?.username === userProfile?.username;
  const othersProfilePageAuth =
    currentUser && userData?.username !== userProfile?.username;

    const { isFollowing, isUpdating, handleFollowerUser} = useFollowUser(userProfile?.uid)


  if (!userProfile) {
    return <p>User profile not found.</p>; 
  }

  return (
    <div className="profile-details">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>

      <div className="profile-info">
        <div className="profile-name">
          <h3>{userProfile?.username}</h3>
          <p>{userProfile?.bio}</p>
        </div>
        <div className="figures">
          <div className="post-count figure">
            <h2>{userProfile.posts.length}</h2>
            <p>Posts</p>
          </div>
          <div className="follower-count figure">
            <h2>{userProfile.followers.length}</h2>
            <p>Followers</p>
          </div>
          <div className="following-count figure">
            <h2>{userProfile.following.length}</h2>
            <p>Following</p>
          </div>
        </div>

        {myProfilePageAuth ? (
          <div className="edit-button">
            <button onClick={displayEditModal}>Edit Profile</button>
            <button>View Activity</button>
          </div>
        ) : (
          othersProfilePageAuth && (
            <div className="edit-button">
              <button onClick={handleFollowerUser}>{isFollowing?"Unfollow":"Follow"}</button>
              <button>View Activity</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
