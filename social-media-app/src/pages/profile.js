import React from "react";
import './profile.css';
import ProfileLeft from "../components/profileLeft/profileLeft";
import ProfileCard from "../components/profileCard";
import PostSide from "../components/postside";
import Trending from "../components/trending";
const ProfilePage=()=>{
    return(
        <div className="profilePage">
            <ProfileLeft />
            <div className="profileCenter">
                <ProfileCard location= 'profilePage'/>
                <PostSide />
                

            </div>
            <Trending />  

        </div>

    )
}
export default ProfilePage;