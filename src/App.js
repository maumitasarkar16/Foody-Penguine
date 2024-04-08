import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact"
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "./utils/cartSlice";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { loadUser } from "./utils/authSlice";


//const About = lazy(() => import("./components/About"))


const AppLayout = () => {

        const [userName, setUserName] = useState();

        //Authentication
        useEffect(() => {
                //API call
                const data = {
                        name: "Maumita sarkar"
                }
                setUserName(data.name)
        }, [])


        appStore.dispatch(getTotals())
        appStore.dispatch(loadUser(null))

        return (
                <Provider store={appStore}>
                        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
                                <div className="app">
                                        <Header />
                                        <ToastContainer />
                                        <Outlet />
                                </div>
                        </UserContext.Provider>
                </Provider>
        )
}

const appRouter = createBrowserRouter([
        {
                path: "/",
                element: <AppLayout />,
                children: [
                        {
                                path: "/",
                                element: <Body />
                        },
                        {
                                path: "/about",
                                element: <About />
                        },
                        // {
                        //         path: "/about",
                        //         element: (
                        //                 <Suspense fallback={<h1>loading...</h1>}>
                        //                         <About />
                        //                 </Suspense>
                        //         )
                        // },
                        {
                                path: "/contact",
                                element: <Contact />
                        },
                        {
                                path: "/cart",
                                element: <Cart />
                        },
                        {
                                path: "/register",
                                element: <Register />
                        },
                        {
                                path: "/login",
                                element: <Login />
                        },
                        {
                                path: "/restaurants/:resId",
                                element: <RestaurantMenu />
                        }
                ],
                errorElement: <Error />


        },


])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={appRouter} />)