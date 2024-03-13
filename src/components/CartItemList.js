import { useDispatch, useSelector } from "react-redux";
import { CON_URL } from "../utils/constants";
import { addItem, removeItem, updateItem, clearCart, decreaseCart, getTotals } from "../utils/cartSlice";
import { useEffect } from "react";


const CartItemList = ({ items }) => {
    console.log("ItemList--", items)
    const dispatch = useDispatch();

    const cart = useSelector((store) => store.cart)

    useEffect(() => {
        dispatch(getTotals())
    },[cart, dispatch])

    


    const handleRemoveItem = (item) => {
        dispatch(removeItem(item))
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const handleUpdateItem = (quantity, item) => {
        //console.log("quantity-----",quantity)
        dispatch(updateItem({ quantity: quantity, item: item }))
    }

    const handleDecreaseCart = (item) => {
        dispatch(decreaseCart(item))
    }

    const handleIncreaseCart = (item) => {
        dispatch(addItem(item))
    }

    return (
        <div>
            <div className="titles mt-2 mb-1 grid items-center grid-cols-4 gap-2">
                <h3 className="product-name font-medium text-md uppercase pl-2" >Product</h3>
                <h3 className="price font-medium text-md uppercase">Price</h3>
                <h3 className="quantity font-medium text-md uppercase">Quantity</h3>
                <h3 className="total font-medium text-md uppercase justify-self-auto">Total</h3>
            </div>
            <div className="cart-items">
                {items.map((item, index) => ( 
                    <div className="cart-item grid items-center  grid-cols-4 gap-2 border-[1px] border-gray-300 p-2" key={item.card.info.id}>
                        <div className="cart-product flex p-1 m-1"><img className="w-[100px] h-[100px] rounded-md max-w-full mr-[4px]" alt="food-logo" src={CON_URL + item.card.info.imageId} />
                            <div>
                                <h3 className="font-medium">{item.card.info.name}</h3>
                                <p className="text-xs text-gray-700">{item.card.info.description}</p>
                                <button className="bg-white text-green-600 font-bold text-sm m-1 p-1 rounded-sm border-solid border-gray-400 border-2 shadow-2xl" onClick={() =>  handleRemoveItem(item) } >Remove</button>
                            </div>
                        </div>
                        <div className="cart-product-price">₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</div>
                        <div className="cart-product-quantity flex justify-center">
                            <button className="bg-gray-200 text-green-600 font-bold text-sm rounded-sm  w-[50px] h-[40px] p-2 m-2" onClick={() => handleDecreaseCart(item)}>-</button>
                            <input type="text" className="count border-2 border-gray-400 w-[50px] h-[40px] p-4 m-2" value={item.cartQuantity}  />
                            <button className="bg-gray-200 text-green-600 font-bold text-sm rounded-sm  w-[50px] h-[40px] p-2 m-2" onClick={() => handleIncreaseCart(item)}>+</button>
                        </div>
                        <div className="cart-product-total justify-self-auto">
                        ₹{(item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100) * item.cartQuantity  }
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary flex justify-between items-start">
                <button className="bg-gray-500 text-white rounded-lg p-2 m-2" onClick={handleClearCart}>Clear Cart</button>
                <div className="cart-checkout p-1 m- 1">
                    <div className="subtotal">
                        <span className="font-bold">Subtotal: </span>
                        <span className="amount">₹{cart.cartTotalAmount}</span> 
                    </div>
                    <button className="bg-green-600 text-white rounded-lg p-2 m-2">Checkout</button>
                </div>
            </div>
   
        </div>
    )

}

export default CartItemList;













{/* {
                items.map((item, index) => (
                    <div key={index} className="py-8 my-2 flex justify-between border-b-2 border-solid border-gray-200">
                        <div className="w-9/12">
                            <div>{item.card.info.name}</div>
                            <div className="text-sm"> ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</div>
                            <p className="text-xs text-gray-500 pt-2 ">{item.card.info.description}</p>
                            
                            <div className="flex justify-center">
                                <button className="bg-gray-200 text-green-600 font-bold text-sm rounded-sm w-[50px] h-[40px] p-2 m-2"> + </button>
                                <input type="text" className="border-2 border-gray-400 w-[50px] h-[40px] p-4 m-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                <button className="bg-gray-200 text-green-600 font-bold text-sm rounded-sm  w-[50px] h-[40px] p-2 m-2" onClick={() => handleUpdateItem(quantity, item)}> - </button>
                            </div> 
                        </div>
                        <div className="w-3/12">
                            <div className="absolute"><button className="bg-white text-green-600 font-bold text-sm mx-14 my-16 p-2 rounded-sm border-solid border-gray-400 border-1 shadow-2xl"
                                onClick={() =>  handleRemoveItem(item) } >
                                 Remove -
                            </button></div>
                            <img className="w-[160px] h-[100px] rounded-md" alt="food-logo" src={CON_URL + item.card.info.imageId} />
                        </div>
                    </div>


                ))
            } */}