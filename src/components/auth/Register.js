import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../utils/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth)
    console.log("auth---", auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (auth._id) {
            navigate("/cart")
        }
    }, [auth._id, navigate])

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    console.log("user:", user)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(user))
    }


    return (
        <div className="text-center m-4 p-4">
            <div className="w-6/12 m-auto">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold">Register</h2>
                    <div><input type="text" placeholder="Name" className="border-2 border-gray-500 m-2 p-3 size-4/6" onChange={(e) => setUser({ ...user, name: e.target.value })} /></div>
                    <div><input type="email" placeholder="Email" className="border-2 border-gray-500 m-2 p-3 size-4/6" onChange={(e) => setUser({
                        ...user, email: e.target.value
                    })} /></div>
                    <div><input type="password" placeholder="Password" className="border-2 border-gray-500 m-2 p-3 size-4/6" onChange={(e) => setUser({ ...user, password: e.target.value })} /></div>
                    <div><button className="border-1 border-gray-500 m-2 p-4 rounded-lg bg-green-500 shadow-lg" >{auth.registerStatus === "pending" ? <p>Submitting</p> : <p>Register</p>}</button></div>

                    {auth.registerStatus === "rejected" ? <p>{auth.registerError}</p> : null}

                </form>
            </div>
        </div>
    )
}

export default Register