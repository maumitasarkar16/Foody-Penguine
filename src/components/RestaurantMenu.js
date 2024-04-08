import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import userRestaurantMenu from "../utils/userRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {
    const { resId } = useParams();

    const [showIndex, setShowIndex] = useState(null);
    const resInfo = userRestaurantMenu(resId);

    /*const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId="+ resId);

        const json = await data.json();
        console.log(json);
        setResInfo(json.data)
    }*/

    if (resInfo === null) return <Shimmer />;

    console.log("resInfo", resInfo)

    const { name, costForTwoMessage, cuisines, areaName, avgRating, sla } = resInfo?.cards[2].card?.card?.info;
    //const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    //console.log("itemCards---", resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

    console.log("restaurant menu Info==",resInfo )

    const ItemCategory = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    console.log("ItemCategory---", ItemCategory)


    return (
        <div className="">
            <div className="w-6/12 m-auto flex justify-center ">
                <span className="px-[50px] py-[10px]">
                    <h2 className="text-2xl">{name}</h2>
                    <h3 className="font-light">{cuisines.join(", ")}</h3>
                    <h3 className="font-light">{areaName}</h3>
                </span>
                <span className="flex px-[50px] py-[10px] ">
                    <img className="h-[20px] m-1" src={require("../assets/images/rating.svg")} alt="rating" /> <h3 className="text-green-700 font-bold ">{avgRating}</h3>
                </span>

            </div>


            <div className="w-6/12 m-auto flex justify-center">
                <span className="px-[45px] py-[10px] ">
                    <h3 className="text-sm font-bold">{costForTwoMessage}</h3>
                </span>
                <span className="px-[45px] py-[10px]  ">
                    <h3 className="text-sm font-bold">{sla.slaString}</h3>
                </span>

            </div>


            {/* <ul>
                {
                        itemCards.map((item) => (
                        <li key = {item.card.info.id}>
                            {item.card.info.name} -  {" Rs "}
                            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                        </li>
                    
                    ))
                }


            </ul> */}

            <ul >
                {
                    ItemCategory.map((category, index) => (
                        <h3><RestaurantCategory key={index} resData={category?.card?.card} showItems={index === showIndex ? true : false} setShowIndex={() => ((showIndex === index ? setShowIndex(null) : setShowIndex(index)))} /></h3>
                    ))
                }
            </ul>

        </div>
    )
}

export default RestaurantMenu;