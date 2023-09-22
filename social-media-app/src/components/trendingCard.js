import React from "react";
import './trendingCard.css';
import { trendData } from "../data/trendData";
const TrendingCard =()=>{
    return(
        <div className="trendCard">
            <h3>Trends for you</h3>
            {trendData.map((trend,id)=>{
                return(
                    <div className="trend" key={id}>
                        <span>#{trend.name}</span>
                        <span>{trend.shares} Shares</span>

                    </div>
                )
            })}

        </div>
    )
}
export default TrendingCard;