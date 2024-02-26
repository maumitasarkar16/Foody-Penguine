import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect, componentDidMount } from "react";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";



const Body = () => {
    //const [listOfRestaurants, setListOfRestaurants] = useState(resList)
    const [listOfRestaurants, setListOfRestaurants] = useState([]); //array
    const [filteredRestaurant, setfilteredRestaurant] = useState([]); //array

    const [searchText, setsearchText] = useState(""); //search text is a string

    const [hasMore, setHasMore] = useState(true); //has more data to load on lazy loading

    console.log("Body rendered")
    //console.log("listOfRestaurants", listOfRestaurants.length)

    useEffect(() => {
        fetchData();
    }, []);

    

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();
        console.log(json);
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

    return listOfRestaurants != undefined && listOfRestaurants.length === 0 ? (<h1><Shimmer /></h1>) : (
        <div className="body">

            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => {
                        setsearchText(e.target.value);
                    }} />
                    <button className="search-btn" onClick={() => {

                        const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()))
                        console.log(searchText); console.log(filteredRestaurant);
                        setfilteredRestaurant(filteredRestaurant)

                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4.5)
                    console.log(filteredList);
                    setfilteredRestaurant(filteredList)
                }}>
                    Filter By Ratings
                </button>
            </div>

           <div className="res-container" >  
           <InfiniteScroll className="res-container" dataLength={filteredRestaurant.length} next={fetchMoreData} hasMore={hasMore} loader={<h4>Loading...</h4>} endMessage={ <p style={{ textAlign: 'center' }}> <b>Yay! You have seen it all</b></p>}>  
                {filteredRestaurant.map((restaurant, index) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}
           </InfiniteScroll>
            </div>   

        </div>
    )
}

export default Body;