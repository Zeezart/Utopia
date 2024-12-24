import useGetUserPost from "../Hooks/useGetUserPost"
import EachPost from "../Component/EachPost";


function ProfilePosts() {
    const {isLoading, posts} = useGetUserPost() 

    const noPostFound:boolean = !isLoading && posts.length === 0
    if(noPostFound) return(<p>No post yet</p>)

    return (
        <div className="posts">
        {
            posts.map((post) => (
                <EachPost post={post} key={post.id}/>
            ))
        }
        </div>
    )
}

export default ProfilePosts