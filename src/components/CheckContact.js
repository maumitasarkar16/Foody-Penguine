import { useState } from "react";

const CheckContact = ({setCheckContactData}) => {
    const [inputValue, setInputValue] = useState('')
    const handleClick = () => {
        setCheckContactData(inputValue)
    }

    return (
        <div>
            <h2>Pass Data from child component (Check Contact) to parent component (Contact)</h2>
            <input type="text" className="border-2 border-grey-400" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <button className="bg-blue-500 m-1 p-1 border-2" onClick={handleClick} >Submit</button>
        </div>
    )
}

export default CheckContact;