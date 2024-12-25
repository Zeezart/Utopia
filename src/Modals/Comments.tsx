import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


function Comments({postDetails, setDisplayComments}:any) {
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
            <div className='individual-comment'>
                <h5>user12345</h5>
                <p>Valid reasoning</p>
                <p className='time-commented'>23/4/2024</p>
            </div>
        </div>
        <div className="enter-comment">
            <input type="text" placeholder="Drop your opinion..."/>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Comments