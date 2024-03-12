import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";


const Header = () => {

    const [buttonName, setbuttonName] = useState("Login");
    const [buttonColor, setButtonColor] = useState("Gray");
    console.log("header rendered");

    const {loggedInUser} = useContext(UserContext);

    //subscribing to the store using a selector
    const cartItems = useSelector((store) => store.cart.items );
    console.log("cart Items -----",cartItems)

    return (
        <div className="flex justify-between  p-4  bg-pink-100 max-h-28 shadow-md sm:bg-yellow-100 lg:bg-green-100">
            <div className="">
                <img className="max-h-24 pb-[10px]" src={require("../assets/images/logo.png")} alt="logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex">
                    <li className="m-4 p-4"><Link to="/">Home</Link></li>
                    <li className="m-4 p-4"><Link to="/about">About Us</Link></li>
                    <li className="m-4 p-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="m-4 p-4 font-semibold text-lg"><Link to="/cart">Cart ({cartItems.length} items) </Link></li>

                    <li className="m-4 p-4 font-bold">{ loggedInUser }</li>
                    <button className="m-4 p-4 bg-green-200 rounded-sm"  onClick={ () => {

                         buttonName === "Login" ? setbuttonName("Logout") : setbuttonName("Login");
                         buttonName === "Login" ? setButtonColor("Green") : setButtonColor("Gray");

                        
                    }} style={{backgroundColor: buttonColor, borderRadius: 5}}>{buttonName}</button>
                </ul>  
            </div>

        </div>
    )
}

export default Header;