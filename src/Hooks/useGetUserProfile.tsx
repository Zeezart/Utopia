import { collection, getDocs, query, where } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { db } from '../Auth/Firebase'
import {useGetUser} from "../ContextApi/GetUserProfileContext"

function useGetUserProfile(username:any) {
    const [isLoading, setIsLoading] = useState(true)
    const {userProfile,setUserProfile} = useGetUser()

    useEffect(() => {
        const getProfile = async() =>{
            setIsLoading(true)
            try{
                const q =query(collection(db,"users"),where("username","==",username))
                const querySnapshot = await getDocs(q)

                if (querySnapshot.empty){
                    setUserProfile(null)
                    return
                }

                let userDoc:any;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data
                })
                setUserProfile(userDoc)
            }catch(error:any){
                alert(error.message)
            }
        }

        getProfile()
    },[setUserProfile, username])
  return {
    isLoading, userProfile
  }
}

export default useGetUserProfile