import useGetUserPost from "../Hooks/useGetUserPost"
import EachPost from "../Component/EachPost";
import EmptyPage from "./EmptyPage";
import { faWarning } from '@fortawesome/free-solid-svg-icons'


function ProfilePosts() {
    const {isLoading, posts} = useGetUserPost() 

    const noPostFound:boolean = !isLoading && posts.length === 0
    if(noPostFound) return(<EmptyPage icon={faWarning} mainMessage={"No Post Yet"} detail={"Write your first post"}/>
    )

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