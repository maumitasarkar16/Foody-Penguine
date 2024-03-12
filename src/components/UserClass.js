import React from "react";

class UserClass extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            //count: 0,
            //count2: 2,
            userInfo: {
                name: "Dummy",
                bio: "Dummy bio",
                avatar_url: ""
            }
        }
        //console.log(this.props.name,"child constructor")
        console.log("child constructor")
    }

    async componentDidMount() {
        //console.log(this.props.name,"child component did mount")
        console.log("child component did mount")
        const data = await fetch("https://api.github.com/users/maumitasarkar16");
        const json = await data.json();

        // console.log(json);

        this.setState({
            userInfo: json
        })

    }

    componentDidUpdate() {
        console.log("component did update");
    }

    componentWillUnmount(){
        console.log("component will unmount");
    }

    render() {
        console.log(this.state.userInfo);
        console.log("child render")

        //console.log(this.props.name,"child render")
        //const {name} = this.props;
        //const {count, count2} = this.state;
         const {name, bio, avatar_url} = this.state.userInfo;

        return (
            <div className="user-sec">
                {/*<h3>Count - {count}</h3>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1,
                    })
                }}
                >
                Update Count</button>
                <h3>Count2 - {count2}</h3>*/}
                <img src={avatar_url}></img>
                <h3>Name - {name}</h3>
                <h3>Bio - {bio}</h3>
                <h3>NodeJs + ReactJs Developer</h3>
            </div>
        )
    }
}

export default UserClass;