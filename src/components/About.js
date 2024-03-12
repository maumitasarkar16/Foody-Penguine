import User from "./User";
import UserClass from "./UserClass";
import React from 'react';
import UserContext from "../utils/userContext";

class About extends React.Component {

    constructor(props) {
        console.log("parent constructor")
        super(props)
    }

    componentDidMount () {
        console.log("parent component did mount")
    }

    render() {
        console.log("parent render")
        return (
            <div>
                <h2>About Us</h2>
                <div>
                    Logged In User
                    <UserContext.Consumer>
                        {({loggedInUser}) => <h1 className="font-bold text-lg">{loggedInUser}</h1>}
                    </UserContext.Consumer>
                </div>
               {/* <User name={"Saumyadip Function"} />
                <UserClass name={"Saumyadip Class"}  /> */}
                <UserClass name={"Maumita Class"}  />
            </div>
            
        )
    }
}

/*const About = () => {
    return (
        <div>
            <h2>About Us</h2>
            <User name={"Saumyadip Function"} />
            <UserClass name={"Saumyadip Class"}  />
            
        </div>


    )
}*/

export default About;