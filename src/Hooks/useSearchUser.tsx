import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../Auth/Firebase'

function useSearchUser() {
  const [isSearching, setIsSearching] = useState(false)
  const [user, setUser] = useState<any>(null)
  

  const searchUserProfile = async(username:string) => {
    try{
        const q =query(collection(db,"users"),where("username","==",username))
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) return alert("user not found")
        
        querySnapshot.forEach((doc) => {
            setUser(doc.data())
        })
    }catch(err:any){
        console.log(err.message)
        setUser(null)
    }finally{
        setIsSearching(false)
    }
  }

  return{user, isSearching, searchUserProfile}
}

export default useSearchUser