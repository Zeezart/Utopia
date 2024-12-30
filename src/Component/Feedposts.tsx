import useGetUserPost from "../Hooks/useGetUserPost"
import EachPost from "../Component/EachPost";


function FeedPosts({post}:any) {

    

    return (
        <div className="posts">
            <EachPost post={post} key={post.id}/>
        
        </div>
    )
}

export default FeedPosts