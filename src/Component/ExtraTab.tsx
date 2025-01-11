import  { useRef } from "react";
import useSearchUser from "../Hooks/useSearchUser";
import useFollowUser from "../Hooks/useFollowUser";
import { useNavigate } from "react-router-dom"

function ExtraTab() {
  //import isSearching below whenyou want to work on the loading state
  const { user, searchUserProfile } = useSearchUser();
  const searchRef = useRef<any>(null);
  
  const handleSearchUser = async () => {
    const searchInput = searchRef.current.value.toLowerCase();
    await searchUserProfile(searchInput); 
  };

  //import isUpdating directly below when you want to work on its loading state
  const { isFollowing,  handleFollowerUser} = useFollowUser(user?.uid)

  const navigate = useNavigate()
  const goToThisUserProfile = () => {
    navigate(`/${searchRef.current.value.toLowerCase()}`)
  }

  return (
    <div className="extra">
      <div className="search-tab">
        <input
          placeholder="Search"
          ref={searchRef}
        />
        <button onClick={handleSearchUser}>Search</button>
      </div>
      <div className="search-result">
        <h2>Search results</h2>
          {user && <div key={user?.id}>
            <div className="sugg-user" onClick={goToThisUserProfile}>
              <div className="suggested-user-details">
                <h3>{user?.username}</h3>
                <p>{user?.bio}</p>
              </div>
              <button onClick={handleFollowerUser}>{isFollowing?"Unfollow":"Follow"}</button>
            </div>
          </div>}
      </div>
      
    </div>
  );
}

export default ExtraTab;
