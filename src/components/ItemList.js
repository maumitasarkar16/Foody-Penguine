import { useDispatch } from "react-redux";
import { CON_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
//import { useState } from "react";


const ItemList = ({ items }) => {
    const navigate = useNavigate();

    console.log("ItemList--", items)
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item))
        navigate("/cart");
    }

    //const location = useLocation();
    //const { pathname } = location;
    //onClick={() => handleAddItem(item)}
    //onClick={handleAddItem(item)}
    //onClick={handleAddItem}

    return (
        <div>
            {
                items.map((item, index) => (
                    <div key={index} className="py-8 my-2 flex justify-between border-b-2 border-solid border-gray-200">
                        <div className="w-9/12">
                            <div>{item.card.info.name}</div>
                            <div className="text-sm"> ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</div>
                            <p className="text-xs text-gray-500 pt-2 ">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12">
                            <div className="absolute"><button className="bg-white text-green-600 font-bold text-sm mx-14 my-16 p-2 rounded-sm border-solid border-gray-400 border-1 shadow-2xl"
                                onClick={() =>  handleAddItem(item)} >
                                Add +
                            </button></div>
                            <img className="w-[160px] h-[100px] rounded-md" alt="food-logo" src={CON_URL + item.card.info.imageId} />
                        </div>
                    </div>


                ))
            }
            {/* <h3>{items.card.info.name}</h3> */}
        </div>
    )

}

export default ItemList