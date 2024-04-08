import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/authSlice";
import { toast } from "react-toastify";

const Header = () => {

    const dispatch = useDispatch();
    const [buttonName, setbuttonName] = useState("Login");
    const [buttonColor, setButtonColor] = useState("Gray");
    console.log("header rendered");

    const {loggedInUser} = useContext(UserContext);

    //subscribing to the store using a selector
    //const cartItems = useSelector((store) => store.cart.items );
    //console.log("cart Items -----",cartItems)

    const {cartTotalQuantity} = useSelector((store) => store.cart );
    const auth = useSelector((store) => store.auth );
   // const auth = useSelector((store) => store.auth)
   // console.log("Auth------",auth)

   const handleLogout = () => {
        dispatch(logoutUser(null))
        toast.warning("Logged Out!", {position: "bottom-left"})
   }
   

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
                    <li className="m-4 p-4 font-semibold text-lg"><Link to="/cart">Cart ({cartTotalQuantity} items) </Link></li>

                    <li className="m-4 p-4 font-bold">{ auth._id ? auth.name : loggedInUser }</li>
                    {/* <button className="m-4 p-4 bg-green-200 rounded-sm"  onClick={ () => {

                         buttonName === "Login" ? setbuttonName("Logout") : setbuttonName("Login");
                         buttonName === "Login" ? setButtonColor("Green") : setButtonColor("Gray");

                        
                    }} style={{backgroundColor: buttonColor, borderRadius: 5}}>{buttonName}</button>

                    <button className="bg-green-600 text-white rounded-lg p-4 m-4"><Link to="/register">Register</Link></button> */}

                    {auth._id ?  <div><button className="m-4 p-4 bg-green-200 rounded-sm" onClick={handleLogout}>Logout</button> </div> : <div> <button className="m-4 p-4 bg-green-200 rounded-sm"><Link to="/login">Login</Link></button> <button className="bg-green-600 text-white rounded-lg p-4 m-4"><Link to="/register">Register</Link></button></div>}
                </ul>  
            </div>

        </div>
    )
}

export default Header;