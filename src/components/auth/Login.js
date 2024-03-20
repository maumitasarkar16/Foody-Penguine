import { useEffect, useState } from "react"
import { loginUser } from "../../utils/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const auth = useSelector((store) => store.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if(auth._id){
            navigate("/cart")
        }

    },[auth._id, navigate])

    const dispatch = useDispatch();
    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginUser(user))
    }

    return (
        <div className="text-center m-4 p-4">
            <div className="w-6/12 m-auto">
                 <form onSubmit={handleLogin}>
                    <h2 className="text-lg font-bold">Login</h2>
                    
                    <div><input type="email" placeholder="Email" className="border-2 border-gray-500 m-2 p-3 size-4/6" onChange={(e) => setUser({
                        ...user, email: e.target.value
                    })} /></div>
                    <div><input type="password" placeholder="Password" className="border-2 border-gray-500 m-2 p-3 size-4/6" onChange={(e) => setUser({ ...user, password: e.target.value })} /></div>
                    <div><button className="border-1 border-gray-500 m-2 p-4 rounded-lg bg-green-500 shadow-lg" >{auth.loginStatus === "pending" ? <p>Submitting</p> : <p>Login</p>}</button></div>

                    {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}

                </form>
            </div>
        </div>
    )
}

export default Login