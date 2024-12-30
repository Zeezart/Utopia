import { useEffect, useState } from "react"
import { useGetPost } from "../ContextApi/PostContext"
import { useAuth } from "../ContextApi/UserAuthContext"
import { useGetUser } from "../ContextApi/GetUserProfileContext"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../Auth/Firebase"


function useGetFeedPosts() {
    const [isFetching, setIsFetching] = useState(false)
    const {posts, setPosts} = useGetPost()
    const {currentUser, userData} = useAuth()
    const {setUserProfile} = useGetUser()

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsFetching(true)
            if(userData?.following.length === 0){
                setIsFetching(false)
                setPosts([0])
                return
            }

            const q = query(collection(db,"posts"), where("createdBy", "in", userData?.following))
            try{
                const querySnapshot =await getDocs(q)
                const feedPosts:any[] = []

                querySnapshot.forEach(doc => {
                    feedPosts.push({id:doc.id, ...doc.data()})
                })

                //sort post 
                feedPosts.sort((a:any,b:any) => b.createdAt - a.createdAt)
                setPosts(feedPosts)
            }catch(err:any){
                console.log(err.message)
            }finally{
                setIsFetching(false)
            }
        }

        if(currentUser) getFeedPosts()
    }, [currentUser, setPosts])

    return{isFetching, posts}
}

export default useGetFeedPosts