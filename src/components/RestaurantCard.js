import { CON_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";


const RestaurantCard = (props) => {
    const {resData} = props;

    const {loggedInUser} = useContext(UserContext)


 
    const {cloudinaryImageId, name, cuisines, areaName, avgRating, costForTwo, sla} = resData?.info;

     return (
         <div className="p-4 m-4 border-2 hover:border-4 h-[430px] w-[300px] bg-gray-20 rounded-md hover:bg-gray-100">
             <img className="w-[260px] h-[200px] rounded-3xl" alt="res-logo" src={CON_URL + cloudinaryImageId}  />
             <h3 className="font-bold py-1 my-1 text-base">{name}</h3>
             <h4 className="font-bold py-1 my-1 text-sm">{cuisines.join(", ")}</h4>
             <span className="flex"><img className="h-[20px]" src={require("../assets/images/rating.svg")} alt="rating" /> <h5 className="mx-1">{avgRating}</h5>   <h5> - {costForTwo}</h5></span>
           
             <h5>Est. Time - {sla.slaString}</h5>
             <h4>{areaName}</h4> 
             {/* <h3>{loggedInUser}</h3> */}
             
         </div>
         
     )
 }


 export const RestaurantCardIsOpen = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-1 p-1">Is Open</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
 }

 export default RestaurantCard;