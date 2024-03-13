import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact"
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/userContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "./utils/cartSlice";


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
                                path: "/restaurants/:resId",
                                element: <RestaurantMenu />
                        }
                ],
                errorElement: <Error />


        },


])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={appRouter} />)