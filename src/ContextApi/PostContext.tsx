import React, { createContext, useContext, useState } from "react";

// Type definition for the context
type TPostContext = {
  posts: TPost[];
  setPosts: any;
  createPost: any;
  deletePost: any;
};

type TPost = {
  id: string;
  postContent: string;
  createdAt: Date;
  createdBy: string;
  user: string;
  likes: any[];
  comments: any[];
}

// Create context
const PostContext = createContext<TPostContext | undefined>(undefined);

export const PostContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  
  const [posts,setPosts] = useState<TPost[]>([])

  function createPost(newPost:any){
    setPosts((prevPosts) => [...prevPosts, newPost])
  }

  function deletePost(postId:any){
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
  }

  return (
    <PostContext.Provider
      value={{posts,setPosts,createPost, deletePost}}
    >
      {children}
    </PostContext.Provider>
  );
};

export const useGetPost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error(
      "useGetUser must be used within a UserPostContextProvider"
    );
  }
  return context;
};
