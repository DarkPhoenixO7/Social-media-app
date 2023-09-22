import React from "react";
import "./profileLeft.css";
import LogoSearch from "../logoSearch";
import FollowersCard from "../followersCard";
import InfoCard from "../infoCard/infoCard";
const ProfileLeft = () => {
  return (
    <div className="profile">
      
        <LogoSearch />
      
      <InfoCard />
      <FollowersCard />
    </div>
  );
};
export default ProfileLeft;
