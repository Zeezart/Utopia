

import Navbar from '../Component/Navbar'

import ExtraTab from '../Component/ExtraTab'
import useGetFeedPosts from '../Hooks/useGetFeedPosts'
import FeedPosts from '../Component/Feedposts'
import MobileNavbar from '../Component/MobileNavbar'

function HomePage(){

 
  const {isFetching, posts} = useGetFeedPosts()
      
  return (
    <div id="home-page">
        <Navbar />
        <div className="heading">
          <h1 className='logo'>Utopia</h1>
        </div>

        <div className='feed'>
          <div className="post">
            {!isFetching && posts.length > 0 && posts.map((post) => 
               <FeedPosts post={post} key={post.id} />
              //<ProfilePosts post={post} key={post.id} />
            )}
          </div>
        </div>

        <ExtraTab />
        <MobileNavbar />
    </div>
  )
}

export default HomePage