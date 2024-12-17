import React, { useState, useEffect } from 'react'
import { useAuth } from '../ContextApi/UserAuthContext'
import { useGetUser } from '../ContextApi/GetUserProfileContext'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Auth/Firebase'

function useFollowUser(userID:any) {

    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing,setIsFollowing] = useState(false)
    const {userProfile, setUserProfile} = useGetUser()
    const {userData,setUserData,currentUser} = useAuth()

    async function handleFollowerUser(){
        setIsUpdating(true)
        if(currentUser)
        try{
            const currentUserRef = doc(db,"users",currentUser.uid)
            const userFollowOrUnfollowRef = doc(db,"users",userID)

            await updateDoc(currentUserRef,{
                following: isFollowing ? arrayRemove(userID) : arrayUnion(userID)
            })
            
            await updateDoc(userFollowOrUnfollowRef,{
                followers: isFollowing ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
            })

            if(isFollowing){
                //we want to unfollow
                setUserData({
                    ...userData,
                    following: userData.following.filter((uid:string) => uid !== userID)
                })
                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter((uid:string) => uid !== currentUser.uid)
                })
            }else{
                //we want to follow
            }
        }catch(err:any){
            alert(err.message)
        }

    }

    useEffect(()=>{
        if(userData){
            const isFollowing = userData.following.includes(userID)
            setIsFollowing(isFollowing)
        }
    },[userData,userID])


  return {isUpdating,isFollowing,handleFollowerUser}
}

export default useFollowUser