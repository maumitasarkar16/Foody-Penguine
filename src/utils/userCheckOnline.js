import { useState, useEffect } from "react";

const userCheckOnline = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {

        window.addEventListener('online', () => {
            setIsOnline(true)
        });

        window.addEventListener('offline', () => {
            setIsOnline(false)
        });

    }, [])

    return isOnline;
}

export default userCheckOnline;