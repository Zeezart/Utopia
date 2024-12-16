import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../Auth/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Auth/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

type TAuthContext = {
  currentUser: User | null;
  loading: boolean;
  userData: any | null;
  SignUp: any;
  LogIn: any;
  GoogleLogin: any;
  SignOut: any;
  setCurrentUser: any;
  setUserData: any;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

//creating the custom hook that would
//make use of the created context called AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


//created a function that provides the created Context to all the children component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

    //defining states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);

  // SignUp function
  const SignUp = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // LogIn function
  const LogIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login function
  const GoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // SignOut function
  const SignOut = () => {
    return signOut(auth);
  };

  // Fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setUserData(null); 
        }
      };
      fetchUserData();
    }
  }, [user]); 

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: user ?? null,
        loading,
        userData,
        SignUp,
        LogIn,
        GoogleLogin,
        SignOut,
        setCurrentUser,
        setUserData
      }}
    >
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
