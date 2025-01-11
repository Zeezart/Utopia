import { useEffect, useState } from "react"
import { useGetPost } from "../ContextApi/PostContext"
import { useAuth } from "../ContextApi/UserAuthContext"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../Auth/Firebase"


function useGetFeedPosts() {
    const [isFetching, setIsFetching] = useState(false)
    const {posts, setPosts} = useGetPost()
    const {currentUser, userData} = useAuth()

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsFetching(true)
            if(userData?.following.length === 0 && userData?.posts.length === 0){
                setIsFetching(false)
                setPosts([])
                return
            }
            const filterList = [currentUser?.uid, ...userData?.following]
            const q = query(collection(db,"posts"), where("createdBy", "in", filterList))
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