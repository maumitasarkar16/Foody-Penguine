import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            //mutating the state here directly
            const itemIndex = state.items.findIndex(
                (item) => item.card.info.id === action.payload.card.info.id
            );

            if (itemIndex >= 0) {
                state.items[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.items[itemIndex].card.info.name} product quantity`, {
                    position: "bottom-left"
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.items.push(tempProduct);
                toast.success("Added a new product to cart", {
                    position: "bottom-left"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items))

        },
        removeItem: (state, action) => {
            //state.items.pop();
            state.items = state.items.filter((item) => item.card.info.id !== action.payload.card.info.id);

            toast.error(`Removed ${item.card.info.name} from cart`, {
                position: "bottom-left"
            });

            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },
        clearCart: (state) => {
            state.items.length = 0;
            toast.error("Cart Cleared", {
                position: "bottom-left"
            });
            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },
        updateItem: (state, action) => {

            //state.items.push(action.payload);
            // for (let i = 0; i < (action.payload.quantity - 1 ); i++) {
            //     state.items.push(action.payload.item);
            // }
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.items.findIndex(
                (item) => item.card.info.id === action.payload.card.info.id
            )

            if (state.items[itemIndex].cartQuantity > 1) {
                state.items[itemIndex].cartQuantity -= 1

                toast.info(`Decreased ${state.items[itemIndex].card.info.name} cart quantity`, {
                    position: "bottom-left"
                });
            } else if (state.items[itemIndex].cartQuantity === 1) {
                state.items = state.items.filter((item) => item.card.info.id !== action.payload.card.info.id);

                toast.error(`Removed ${state.items[itemIndex].card.info.name} from cart`, {
                    position: "bottom-left"
                });

            }
            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },

        getTotals: (state, action) => {
            let { total, quantity } = state.items.reduce((cartTotal, item) => {
                const { price, defaultPrice } = item.card.info;
                const { cartQuantity } = item;
                const itemTotal = price ? price * cartQuantity : defaultPrice * cartQuantity;

                cartTotal.total += itemTotal/100;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    }
});

export const { addItem, removeItem, clearCart, updateItem, decreaseCart, getTotals } = cartSlice.actions

export default cartSlice.reducer