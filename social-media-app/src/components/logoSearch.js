import React from "react";
import {BsSearch} from 'react-icons/bs'
import './logoSearch.css';
import logo from '../img/logo.png';
const LogoSearch =()=>{
    return(
    <div className="logoSearch">
        <img src={logo} alt=""/>
        <div className="search">
            <input type="text" placeholder="Explore" />
            <div className="icon"> 
            <BsSearch />
            
             </div>

        </div>

    </div>
    )
}
export default LogoSearch;