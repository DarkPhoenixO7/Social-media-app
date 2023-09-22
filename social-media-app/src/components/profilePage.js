import React from "react";
import './profilePage.css';
import LogoSearch from "./logoSearch";
import ProfileCard from "./profileCard";
import FollowersCard from "./followersCard";
const Profile =()=>{
    return(
        <div className="profile">
            <LogoSearch />
            <ProfileCard />
            <FollowersCard />

        </div>
    )
}
export default Profile;