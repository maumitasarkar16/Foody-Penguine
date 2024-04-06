import { useState } from "react";
import CheckContact from "./CheckContact";

const Contact = () => {
    const [checkContactData, setCheckContactData] = useState('')

    const handleDataFromCheckContact = (data) => {
        setCheckContactData(data)
    }

    return (
        <div>
            <h2 data-testid="contact-us">Contact Us</h2>
            <CheckContact setCheckContactData={handleDataFromCheckContact}/>
            <p>Data from Check Contact in Parent- { checkContactData } </p>
        </div>
    )
}

export default Contact;