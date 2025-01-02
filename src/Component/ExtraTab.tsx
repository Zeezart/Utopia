import React, { useRef, useState } from "react";
import useSearchUser from "../Hooks/useSearchUser";
import useFollowUser from "../Hooks/useFollowUser";

function ExtraTab() {
  const { user, isSearching, searchUserProfile } = useSearchUser();
  const searchRef = useRef<any>(null);
  
  const handleSearchUser = async () => {
    const searchInput = searchRef.current.value.toLowerCase();
    await searchUserProfile(searchInput); 
  };

  const { isFollowing, isUpdating, handleFollowerUser} = useFollowUser(user?.uid)



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
            <div className="sugg-user">
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
