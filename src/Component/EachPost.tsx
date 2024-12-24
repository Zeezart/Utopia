function EachPost({post}:any) {
    

  return (
    <div id="each-post">
        <div className="post-header">
            <div className="post-detail">
                <h3>{post.user}</h3>
                <p>{post.createdAt}</p>
            </div>

            <i>More</i>
        </div>

        <div className="post-message">
            <p>{post.postContent}</p>
        </div>

        <div className="post-interaction">
            <i>love</i>
            <i>comment</i>
            <i>save</i>
        </div>
    </div>
  )
}

export default EachPost