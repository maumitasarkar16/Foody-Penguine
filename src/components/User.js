import { useState } from "react";

const User = (props) => {

    const {name} = props;
    const [count, setCount] = useState(0);
    const [count2] = useState(1);

    
    return (
        <div className="user-sec">
            <h3>Count - {count}</h3>
            <button onClick={ () => {
                setCount( count + 1)
            }} 
            >
            update Count</button>
            <h3>Count2 -{count2}</h3>
            <h3>{name}</h3>
            <h3>Singapore</h3>
            <h3>NodeJs + ReactJs Developer</h3>
        </div>
    )
}

export default User