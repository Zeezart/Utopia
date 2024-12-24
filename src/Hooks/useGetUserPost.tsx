import {useEffect, useState} from 'react'
import { useGetPost } from '../ContextApi/PostContext'
import { useGetUser } from '../ContextApi/GetUserProfileContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../Auth/Firebase'

function useGetUserPost() {
    const [isLoading, setIsLoading] = useState(true)
    const {posts, setPosts} = useGetPost()
    const {userProfile} = useGetUser()

    useEffect(()=>{
        const getPosts = async () => {
            if(!userProfile) return
            setIsLoading(true)
            setPosts([])

            try{
                const q = query(collection(db,"posts"), where("createdBy", "==", userProfile.uid))
                const querySnapshot = await getDocs(q)

                const posts:any = []
                querySnapshot.forEach(doc => {
                    posts.push({...doc.data(), id:doc.id})//the id added here is for the key when you want to map throught the data to diaplay it
                })

                posts.sort((a:any,b:any)=>b.createdAt - a.createdAt)
                setPosts(posts)

            }catch(error: any){
                alert(error.message)
            }finally{
                setIsLoading(false)
            }
        }

        getPosts()
    },[setPosts, userProfile])


    return {isLoading, posts}
}

export default useGetUserPost