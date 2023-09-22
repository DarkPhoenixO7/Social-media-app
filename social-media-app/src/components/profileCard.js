import React from "react";
import './profileCard.css';
import { Link } from "react-router-dom";
import profile from '../img/profile.jpg';
import cover from '../img/cover.jpg';
import ProfilePage from "../pages/profile";
import { useSelector } from "react-redux";
const ProfileCard =({location})=>{
    const serverPublic = "http://localhost:5000/images/"
    const {user} = useSelector((state)=>state.authReducer.authData)
    const posts = useSelector((state)=>state.postReducer.posts)
    return(
        <div className="profileCard">
            <div className="profileImg">

                <img src={user.coverPicture? serverPublic + user.coverPicture: serverPublic+ "defaultCover.jpg" } alt="" />
                <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic+ "defaultProfile.png" } alt="" />
                

            </div>
            <div className="profileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.wroksAt?user.wroksAt: "Write about yourself"}</span>
            </div>
            <div className="followStatus">
                <hr />
                <div className="followDetails">
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Following</span>

                    </div>
                    <div className="verticalLine">
                    </div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>

                    </div>
                    {location=== 'profilePage' &&(
                        <>
                        <div className="verticalLine">


                        </div>
                        <div className="follow">
                            <span>
                                {posts.filter((post)=>post.userId===user._id).length}
                            </span>
                            <span>Post</span>

                        </div>
                        </>
                    )}
                </div>
                <hr />

            </div>
            {location=== 'profilePage'? '': <span>
                <Link style={{textDecoration: 'none', color:'inherit'}} to={`/profile/${user._id}`}>
                My Profile
                </Link>
                </span> }
            

        </div>
    )
}
export default ProfileCard;