import React from "react";
import './home.css';
import Profile from "../components/profilePage";
import PostSide from "../components/postside";
import Trending from "../components/trending";
const Home=()=>{
    return(
        <div className="Home">
            <Profile/>
            <PostSide />
            <Trending />
            
            

        </div>
    )
}
export default Home;