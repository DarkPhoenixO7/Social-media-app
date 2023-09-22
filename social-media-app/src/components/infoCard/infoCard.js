import React, { useEffect, useState } from "react";
import './infoCard.css';
import {BsPencilSquare} from 'react-icons/bs';
import CreateModal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from '../../api/userRequest'
import { logout } from "../../action/authAction";
const InfoCard =()=>{
    const dispatch = useDispatch()
    const params = useParams()
    const profileUserId = params.id
    const [profileUser, setProfileUser]= useState({})
    const {user}= useSelector((state)=>state.authReducer.authData)
    const [modalOpen, setModalOpen]= useState(false);
    useEffect(()=>{
        console.log("use effetc")
        const fetchProfileUser = async()=>{
            if (profileUserId===user._id)
            {
                setProfileUser(user);
                console.log(user)
                
            }
            else{
                const profileUser= await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
                console.log(profileUser)
            }
        }
        fetchProfileUser();
    },[user]);

    const handleLogout =()=>{
        dispatch(logout())
    }


    return(
        <div className="infoCard">
            <div className="infoHead">
                <h3>Profile Info</h3>
                {user._id===profileUserId? (<div>
                <BsPencilSquare cursor='pointer' onClick={()=>setModalOpen(true)} />
                 <CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} data={user}  />
                </div>): ("")}

            </div>
            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship}</span>

            </div>
            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser.livesin}</span>

            </div>
            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.worksat}</span>

            </div>
            <button onClick={handleLogout} className="button logout-btn">Logout</button>

        </div>

    )
}
export default InfoCard;