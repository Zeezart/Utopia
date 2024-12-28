import { useState } from "react"
import { useAuth } from "../ContextApi/UserAuthContext"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../Auth/Firebase"

function useLikePost(post:any) {
  const [isLiking, setIsLiking] = useState(false)
  const {currentUser} = useAuth()
  const [likes,setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?.uid))


  const handleLikePost = async() => {
    if (isLiking) return
    if (!currentUser) return alert("Log in to like a post")
    setIsLiking(true)

    try{
        const postRef = doc(db,"posts",post.id)
        await updateDoc(postRef,{
            likes: isLiked ? arrayRemove(currentUser?.uid) : arrayUnion(currentUser.uid)
        })

        setIsLiked(!isLiked)
        isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    }catch(err:any){
        alert(err.message)
    }finally{
        setIsLiking(false)
    }
  }

  return{isLiked, isLiking, handleLikePost,likes}
}

export default useLikePost