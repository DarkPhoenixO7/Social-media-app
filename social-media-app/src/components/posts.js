import React, { useEffect } from "react";
import './posts.css';
import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../action/postAction";
import { useParams } from "react-router-dom";
const Posts =()=>{
    const params = useParams()
    const dispatch = useDispatch()
    const {user}= useSelector((state)=>state.authReducer.authData)
    let {posts,loading}=useSelector((state)=>state.postReducer)
    console.log(posts)
    
    useEffect(() => {
        console.log( "post timeline")
        dispatch(getTimelinePosts(user._id))
    },[])

    if (!posts) return "no post"
    if (params.id) posts=posts.filter((post)=>post.userId===params.id)
    return(
        <div className="posts">
            {loading? 'Fetching posts':posts.map((post,id)=>{
                return (
                <Post data={post} id={id} />
                )
            })}

        </div>
    )
   
    
}
export default Posts;