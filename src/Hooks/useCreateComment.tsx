import { useState } from "react"
import { useAuth } from "../ContextApi/UserAuthContext"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../Auth/Firebase"
import { useGetPost } from "../ContextApi/PostContext"


function useCreateComment() {
  const [isCommenting, setIsCommenting] = useState(false)
  const {currentUser, userData} = useAuth()
  const {addComment} = useGetPost()

  const handlePostComment = async(postId:any, comment:any) => {
    if (isCommenting) return

    if (!currentUser) return alert("Log in to comment")
    setIsCommenting(true)
    const newComment = {
        commentContent : comment,
        createdAt : Date.now(),
        createdBy: userData.username,
        postId
    }
    try{
        await updateDoc(doc(db,"posts",postId),{
            comments: arrayUnion(newComment)
        })

        addComment(postId, newComment)
    }catch(err:any){
        console.log(err.message)
    }finally{
        setIsCommenting(false)
    }
  }

  return {isCommenting, handlePostComment}
}

export default useCreateComment