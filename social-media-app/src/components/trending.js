import React from "react";
import './trending.css';
import {AiOutlineHome, AiOutlineSetting,AiOutlineNotification} from 'react-icons/ai';
import TrendingCard from "./trendingCard";
import { Link } from "react-router-dom";
const Trending=()=>{
    return(
        <div className="trending">
            <div className="navIcon">
                <Link style={{color:'inherit'}} to='../home'>
                <AiOutlineHome className="nav-icon"/>
                </Link>
                <AiOutlineSetting className="nav-icon"/>
                <AiOutlineNotification className="nav-icon"/>


            </div>
            <TrendingCard />

        </div>
    )
}
export default Trending;