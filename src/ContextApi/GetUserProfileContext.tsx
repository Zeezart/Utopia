import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./UserAuthContext"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Auth/Firebase"; 

// Define the type for user profile data
// type UserProfile = {
//   name?: string;
//   email?: string;
//   profilePicture?: string;
// };

// type TUserProfileContext = {
//   userProfile: UserProfile | null;
//   setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
// };

type TUserProfileContext = {
    userProfile: any;
    setUserProfile: any;
  };

const UserProfileContext = createContext<TUserProfileContext | undefined>(undefined);
//const UserProfileContext = createContext(undefined);

export const UserProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  // const { userData } = useAuth(); // Use data from the Auth context

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     if (!userData) {
  //       setUserProfile(null); // Reset if no user is logged in
  //       return;
  //     }

  //     try {
  //       const userRef = doc(db, "users", userData.uid); // Access user document
  //       const userSnap = await getDoc(userRef);

  //       if (userSnap.exists()) {
  //         setUserProfile(userSnap.data() as UserProfile); 
  //       } else {
  //         console.error("User profile not found");
  //         setUserProfile(null);
  //       }
  //     } catch (error:any) {
  //       console.error("Error fetching user profile:", error.message);
  //       setUserProfile(null);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [userData]);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useGetUser = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useGetUser must be used within a UserProfileContextProvider");
  }
  return context;
};
