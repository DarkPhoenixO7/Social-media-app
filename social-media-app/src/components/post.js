import React, { useState } from "react";
import './post.css';
import {AiFillHeart} from 'react-icons/ai';
import {FaRegComment} from 'react-icons/fa';
import {BsShare} from 'react-icons/bs';
import { useSelector } from "react-redux";
import { likePost } from "../api/postRequest";
const Post =({data})=>{
    const {user}=useSelector((state)=> state.authReducer.authData)
        const [liked, setLiked] = useState(data.likes.includes(user._id));
        const [likes, setLikes] = useState(data.likes.length)
      
        const handleLike = () => {
            setLiked((prev) => !prev); 
            likePost(data._id, user._id).then(() => {
              liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
            });
          };
          console.log(data)
    return(
        <div className="post">
            <img src={data.image? `http://localhost:5000/images/${data.image}`: ""} alt=""/>
            <div className="postReact">
                <AiFillHeart color={liked? 'red': 'white'} style={{ fontSize:'30px', cursor:'pointer'}}
                onClick={handleLike} />
                <FaRegComment style={{ fontSize:'25px'}}/>
                <BsShare style={{ fontSize:'25px'}}/>

            </div>
            
                <span>{likes} Likes</span>
            <div className="detail">
                <span><b>{data.name} </b></span>
                <span>{data.desc}</span>

            </div>

        </div>
    )
}
export default Post;