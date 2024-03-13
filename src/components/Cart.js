import { useDispatch, useSelector } from "react-redux";
//import ItemList from "./ItemList";
//import { clearCart } from "../utils/cartSlice";
import CartItemList from "./CartItemList";

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);
    console.log("Cart Items---", cartItems)

    const dispatch = useDispatch();
    // const handleClearCart = () => {
    //     dispatch(clearCart());
    // }


    if (cartItems.length === 0)
        return (
            <div className="text-center m-2 p-2">
                <h1 className=" w-6/12 m-auto text-lg font-bold">Cart is empty.Please add some products</h1>
            </div>
        );

    return (
        <div className="text-center m-4 p-4">
            <h2 className="text-2xl font-bold">Cart</h2>
            <div className="w-9/12 m-auto">
                {/* <button className="bg-black text-white rounded-lg p-2 m-2" onClick={handleClearCart}>Clear Cart</button> */}
                <CartItemList items={cartItems} />
            </div>
        </div>
    )
}

export default Cart;