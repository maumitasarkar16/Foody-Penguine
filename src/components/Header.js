import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {

    const [buttonName, setbuttonName] = useState("Login");
    console.log("header rendered");

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={require("../assets/images/logo.png")} alt="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button onClick={ () => {

                         buttonName === "Login" ? setbuttonName("Logout") : setbuttonName("Login")
                        
                    }}>{buttonName}</button>
                </ul>  
            </div>

        </div>
    )
}

export default Header;