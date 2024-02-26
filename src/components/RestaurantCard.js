import { CON_URL } from "../utils/constants";


const RestaurantCard = (props) => {
    const {resData} = props;
 
    const {cloudinaryImageId, name, cuisines, areaName, avgRating, costForTwo, sla, time} = resData?.info;

     return (
         <div className="rest-card">
             <img className="res-logo" alt="res-logo" src={CON_URL + cloudinaryImageId}  />
             <h3>{name}</h3>
             <h4>{cuisines.join(", ")}</h4>
             <h4>{areaName}</h4>
             <h5>{avgRating} stars</h5>
             <h5>{costForTwo}</h5>
             <h5>{sla.slaString}</h5>
             <h5>{time}</h5>
         </div>
     )
 }

 export default RestaurantCard;