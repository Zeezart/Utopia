import { useState } from 'react'
import Navbar from '../Component/Navbar'
import ExtraTab from '../Component/ExtraTab'
import {useGetUser} from "../ContextApi/GetUserProfileContext"
import {useAuth } from "../ContextApi/UserAuthContext"
import {useGetPost} from "../ContextApi/PostContext"
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Auth/Firebase'
import MobileNavbar from '../Component/MobileNavbar'
import { useNavigate } from 'react-router-dom'

function Create() {

  const [post,setPost] = useState<string>("")

  const handlePostCreation = async() => {
    try {
			await handleCreatePost(post);
			setPost("");
		} catch (error:any) {
			alert(error.message);
		}
  }
  
  //const {isLoading} = useCreatePost()
  const {handleCreatePost} = useCreatePost()

  return (
    <div  id="create-page">
      <Navbar />
      
      <div className='create'>
        <div className="create-header">
          <h2>Create</h2>
          <p>Post your thoughts</p>
        </div>

        <div className="create-content">
          <textarea 
            placeholder='Type something...'
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button onClick={handlePostCreation}>Post</button>
        
        </div>
      </div>
      <ExtraTab />
      <MobileNavbar />
    </div>
  )
}

export default Create


function useCreatePost(){
  const [isLoading] = useState(false)
  const {userData} = useAuth()
  const {createPost} = useGetPost()
  const {addPost} = useGetUser()
  const navigate = useNavigate()
  



  async function handleCreatePost(post:string){
    const newPost = {
      postContent: post,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: userData.uid,
      user: userData.username,
    }

    try{
      const postDocRef = await addDoc(collection(db,"posts"),newPost)
      const userDocRef = doc(db,"users",userData.uid)

      await updateDoc(userDocRef, {posts:arrayUnion(postDocRef.id)})
      //createPost({...newPost, id:postDocRef.id})
      createPost(newPost)

      addPost({...newPost,id:postDocRef.id})
      alert("post created successfully")
      
      navigate("/home")
    }catch(error: any){
      console.log(error)
      alert(error.message)
    }
  }
  

  return {handleCreatePost, isLoading}
}