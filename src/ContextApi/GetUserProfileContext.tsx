// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./UserAuthContext"; 
// import { doc, getDocs,where,query,collection } from "firebase/firestore";
// import { db } from "../Auth/Firebase"; 
// import { useParams } from "react-router-dom";

// // Define the type for user profile data
// // type UserProfile = {
// //   name?: string;
// //   email?: string;
// //   profilePicture?: string;
// // };

// // type TUserProfileContext = {
// //   userProfile: UserProfile | null;
// //   setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
// // };

// type TUserProfileContext = {
//     userProfile: any;
//     setUserProfile: any;
//     fetchUserProfileByUsername: any;
//   };

// const UserProfileContext = createContext<TUserProfileContext | undefined>(undefined);
// //const UserProfileContext = createContext(undefined);

// export const UserProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [userProfile, setUserProfile] = useState<any>(null);
//   // const { userData } = useAuth(); // Use data from the Auth context

//   const fetchUserProfileByUsername = async (username: string) => {
//     try {
//       const usersRef = collection(db, "users");
//       const q = query(usersRef, where("username", "==", username));
//       const querySnapshot = await getDocs(q);
  
//       if (!querySnapshot.empty) {
//         const userData = querySnapshot.docs[0].data();
//         setUserProfile(userData);
//       } else {
//         console.error("No user found with this username");
//         setUserProfile(null);
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       setUserProfile(null);
//     }
//   };

//   return (
//     <UserProfileContext.Provider value={{ userProfile, setUserProfile,fetchUserProfileByUsername }}>
//       {children}
//     </UserProfileContext.Provider>
//   );
// };

// export const useGetUser = () => {
//   const context = useContext(UserProfileContext);
//   if (!context) {
//     throw new Error("useGetUser must be used within a UserProfileContextProvider");
//   }
//   return context;
// };




































import React, { createContext, useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Auth/Firebase";

// Type definition for the context
type TUserProfileContext = {
  userProfile: any | null;
  setUserProfile: React.Dispatch<React.SetStateAction<any | null>>;
  fetchUserProfileByUsername: (username: string) => Promise<void>;
};

// Create context
const UserProfileContext = createContext<TUserProfileContext | undefined>(
  undefined
);

export const UserProfileContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const fetchUserProfileByUsername = async (username: string) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUserProfile(querySnapshot.docs[0].data());
      } else {
        setUserProfile(null);
        console.error("No user found with this username.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, fetchUserProfileByUsername }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useGetUser = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useGetUser must be used within a UserProfileContextProvider"
    );
  }
  return context;
};
