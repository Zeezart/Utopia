import { useState } from 'react'
import { useAuth } from '../ContextApi/UserAuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../Auth/Firebase'
import { useGetUser } from "../ContextApi/GetUserProfileContext"

function useEditProfile() {
    const {currentUser, userData, setUserData} = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const {setUserProfile, userProfile} = useGetUser()

  const editProfile = async(profileDetails:any) => {
    if(isUpdating || !currentUser){
        return
    }
    setIsUpdating(true)

    
    const userDocRef = doc(db,"users",currentUser.uid)

    try{
        

        const updatedUser = {
            ...userData,
            username: profileDetails.username || userData.username,
            bio: profileDetails.bio || userData.bio
        }

        await updateDoc(userDocRef,updatedUser)
        localStorage.setItem("user-info", JSON.stringify(updatedUser))
        setUserData(updatedUser)
        setUserProfile(updatedUser)
        alert("profile updated successfully")
    }catch(err:any){
        alert(err.message)
    }
  }

  return {editProfile, isUpdating}
}

export default useEditProfile