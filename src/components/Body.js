import RestaurantCard, { RestaurantCardIsOpen } from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import userCheckOnline from "../utils/userCheckOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux"


const Body = () => {

    const auth = useSelector((store) => store.auth );
    console.log("auth--", auth)

    //const [listOfRestaurants, setListOfRestaurants] = useState(resList)
    const [listOfRestaurants, setListOfRestaurants] = useState([]); //array
    const [filteredRestaurant, setfilteredRestaurant] = useState([]); //array

    const [searchText, setsearchText] = useState(""); //search text is a string

    const [hasMore, setHasMore] = useState(true); //has more data to load on lazy loading

    console.log("Body rendered", listOfRestaurants)
    //console.log("listOfRestaurants", listOfRestaurants.length)
    const isOnline = userCheckOnline();

    const {loggedInUser, setUserName} = useContext(UserContext);


    useEffect(() => {
        fetchData();
    }, []);

    const WithRestaurantCardIsOpen = RestaurantCardIsOpen(RestaurantCard);


    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();
        console.log("body data---",json);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setfilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

    }

    const fetchMoreData = async () => {

        console.log("fetchMoreData----------------");
        //debugger;

        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "lat": 12.9351929, "lng": 77.62448069999999, "nextOffset": "COVCELQ4KIDYzqDQv9SLejCnEzgC",

                }
            )
        });

        const json = await data.json();
        console.log(json);
        setListOfRestaurants(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setfilteredRestaurant(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

        //setListOfRestaurants((listOfRestaurants) => [...listOfRestaurants, ...json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants])
        //setfilteredRestaurant((filteredList) => [...filteredList, ...json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants])

    }

    if (isOnline === false)
        return (
            <h1>Sorry no internet connection</h1>
        );



    return listOfRestaurants != undefined && listOfRestaurants.length === 0 ? (<h1><Shimmer /></h1>) : (
        <div className="body">

            <div className="filter flex">
                <div className="search">
                    <input type="text" className="h-4 m-4 p-4 border-2 border-gray-300 " value={searchText} onChange={(e) => {
                        setsearchText(e.target.value);
                    }} />
                    <button className="m-[14px]  bg-blue-200 p-2 rounded-md" onClick={() => {

                        const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()))
                        console.log(searchText); console.log(filteredRestaurant);
                        setfilteredRestaurant(filteredRestaurant)

                    }}>Search</button>
                </div>
                <div className="flex">
                    <button className="m-[14px] px-4 bg-blue-600 rounded-md" onClick={() => {
                        const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4.5)
                        console.log(filteredList);
                        setfilteredRestaurant(filteredList)
                    }}>
                        Filter By Ratings
                    </button>
                </div>

                <div className="flex items-center">
                    <label>Username</label>
                    <input type="text" className="border-2 border-gray-500 p-2 m-2" value={loggedInUser} onChange={(e) => setUserName(e.target.value)} />
                </div>
            </div>

            <div className="flex" >
                <InfiniteScroll className="flex flex-wrap" dataLength={filteredRestaurant.length} next={fetchMoreData} hasMore={hasMore} loader={<h4>Loading...</h4>} endMessage={<p style={{ textAlign: 'center' }}> <b>Yay! You have seen it all</b></p>}>
                    {filteredRestaurant.map((restaurant, index) => (
                        <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}>
                            {restaurant.info.isOpen === true ? <WithRestaurantCardIsOpen resData={restaurant} /> : <RestaurantCard resData={restaurant} />}
                        </Link>
                    ))}
                </InfiniteScroll>
            </div>

        </div>
    )
}

export default Body;