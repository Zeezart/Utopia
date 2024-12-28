import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useCreateComment from '../Hooks/useCreateComment';
import { useState } from 'react';
import { useAuth } from '../ContextApi/UserAuthContext';
import { timeAgo } from '../Utils/Timestamp';


function Comments({postDetails, setDisplayComments}:any) {
    const {isCommenting, handlePostComment} = useCreateComment()
    const [inputedComment, setInputedComment] = useState("")
    const {currentUser} = useAuth()

    const handleSubmitComment = async() => {
        await handlePostComment(postDetails.id, inputedComment)
        setInputedComment("")
    }
    return (
    <div id="comments-section">
        <div className='comments-header'>
            <p>Comments</p>
            <FontAwesomeIcon icon={faClose} onClick={()=>setDisplayComments(false)}/>
        </div>
        <div className="commented-post">
            <h4>{postDetails.user}</h4>
            <p>{postDetails.postContent}</p>
        </div>
        <div className="all-comments">
            {postDetails.comments.map((comment:any,index:number) => (
                <div className='individual-comment' key={index}>
                    <h5>{comment.createdBy}</h5>
                    <p>{comment.commentContent}</p>
                    <p className='time-commented'>{timeAgo(comment.createdAt)}</p>
                </div>
            ))}
        </div>
        {currentUser && <div className="enter-comment">
            <input 
                type="text" 
                placeholder="Drop your opinion..."
                onChange={(e)=>setInputedComment(e.target.value)}
                value={inputedComment}
            />
            <button onClick={handleSubmitComment} >Send</button>
        </div>}
    </div>
  )
}

export default Comments