import { useState } from "react"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useAuth } from "../ContextApi/UserAuthContext"
import { db } from "../Auth/Firebase"
import { useGetPost } from "../ContextApi/PostContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons"
//import { useGetUser } from "../ContextApi/GetUserProfileContext";
import Comments from "../Modals/Comments";
import { timeAgo } from "../Utils/Timestamp"
import useLikePost from "../Hooks/useLikePost"

function EachPost({post}:any) {
    
    const {userData} = useAuth()
    //const {userProfile} = useGetUser()

    //HANDLE LIKE POST FUNCTIONALITY
    //const {isLiking} = useLikePost(post)
    const {handleLikePost,likes,isLiked} = useLikePost(post)


    //MORE OPTIONS DROPDOWN FUNCTIONALITY
    

    const [displayMoreDropdown, setDisplayMoreDropdown] = useState(false)
    function handleMoreDropdown(){
        // if (buttonRef.current) {
        //     const rect = buttonRef.current.getBoundingClientRect();
        //     setPosition({
        //       top: rect.bottom, // Position below the button
        //       left: rect.left,  // Align to the left of the button
        //     });
        // }
        setDisplayMoreDropdown(!displayMoreDropdown)
    }



    //DISPLAY COMMENT FUNCTIONALITY
    const [displayComments, setDisplayComments] = useState(false)
    function handleDisplayComments(){
        setDisplayComments(true)
    }


    //DELETE POST
    const [isDeleting, setIsDeleting] = useState(false)
    const {deletePost} = useGetPost()
    async function handleDeletePost(postId:any){
        if(!window.confirm("Are you sure you want to delete this post?")) return
        if(isDeleting) return
        try{
            const userRef = doc(db,"users",userData.uid)
            await deleteDoc(doc(db,"posts",post.id))
            await updateDoc(userRef,{
                posts: arrayRemove(post.id)
            })

            deletePost(postId)
            setDisplayMoreDropdown(false)
        }catch(err:any){
            alert(err.message)
        }finally{
            setIsDeleting(false)
        }
    }
  return (
    <div id="each-post">
        <div className="post-header">
            <div className="post-detail">
                <h3>{post?.user}</h3>
                <p>{timeAgo(post?.createdAt)}</p>
            </div>

           {userData?.username === post.user && <FontAwesomeIcon  icon={faEllipsisH} onClick={handleMoreDropdown}/>}

            {displayMoreDropdown && !isDeleting &&
                <div className="more-dropdown-menu">
                    <p onClick={handleDeletePost}>Delete</p>
                    <p>Edit</p>
                </div>
            }
        </div>

        <div className="post-message">
            <p>{post?.postContent}</p>
        </div>

        <div className="post-interaction">
            <div onClick={handleLikePost} className="each-post-interaction-icon">
                <FontAwesomeIcon icon={isLiked ? faSolidHeart : faRegularHeart} style={{ color: isLiked ? "#5285cc" : "#000" }}/>
                <p>{likes}</p>
            </div>

            <div onClick={handleDisplayComments} className="each-post-interaction-icon">
                <FontAwesomeIcon icon={faComment} />
                <p>{post?.comments?.length}</p>
            </div>

            {/* <div  className="each-post-interaction-icon">
                <FontAwesomeIcon icon={faBookmark} />   
            </div> */}
            
        </div>

        {displayComments && <Comments postDetails={post} setDisplayComments={setDisplayComments}/>}
    </div>
  )
}

export default EachPost