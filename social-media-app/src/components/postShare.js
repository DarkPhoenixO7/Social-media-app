import React, { useRef, useState } from "react";
import "./postShare.css";
import profile from "../img/profile.jpg";
import { BiPhotoAlbum, BiVideo, BiCurrentLocation } from "react-icons/bi";
import { AiOutlineSchedule } from "react-icons/ai";
import {RxCross1} from 'react-icons/rx';
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../action/uploadAction";
const PostShare = () => {
  const serverPublic = "http://localhost:5000/images/"
    const loading = useSelector((state)=> state.postReducer.uploading)
    const [image,setImage]= useState(null);
    const imageRef = useRef();
    const onChangeImg =(event)=>{
        if(event.target.files && event.target.files[0]){
            let img= event.target.files[0];
            setImage(img)
        }

    }
    const {user}= useSelector((state)=>state.authReducer.authData)
    const desc = useRef()
    const dispatch = useDispatch()
   
const handleImageReset = () => {
    setImage(null);
    imageRef.current.value = '';
  };
  const reset =()=>{
    setImage(null)
    desc.current.value=""
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    const newPost ={
      userId:user._id,
      desc:desc.current.value
    }
    if (image){
      const data = new FormData()
      const filename = Date.now()+ image.name
      data.append("name", filename)
      data.append("file", image)
      newPost.image= filename
      console.log(newPost)
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }
  return (
    <div className="postShare">
      <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="" />
      <div>
        <input ref={desc} required type="text" placeholder="Something in mind?"></input>
        <div className="postOption">
          <div className="option" style={{color:'purple'}} onClick={()=>imageRef.current.click()}>
            <BiPhotoAlbum />
             Photo
          </div>
          <div className="option" style={{color:'green'}}>
            <BiCurrentLocation />
            Location
          </div>
          <div className="option" style={{color:'red'}}>
            <BiVideo />
            Video
          </div>
          <div className="option" style={{color:'blue'}}>
            <AiOutlineSchedule />
            Schedule
          </div>
          <button onClick={handleSubmit} className="button" disabled={loading}>{loading? "Uploading": "Share"}</button>
          <div style={{display:"none"}}> 
            <input type="file" name="myImage" ref={imageRef} onChange={onChangeImg} />
          </div>
        </div>
        {image && (
            <div className="previewImage">
                <RxCross1 onClick={handleImageReset} />
                <img src={URL.createObjectURL(image)} alt="" />

            </div>
        )}
      </div>
    </div>
  );
};
export default PostShare;
