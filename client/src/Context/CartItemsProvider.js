import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = (props) => {

    const [cartItems, setCartItems] = useState([])
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0)
    
    const addToCartHandler = (item, quantity) => {
        const { _id, name, price, image, category, size} = item;
        removeFromCartHandler(item)
        setCartItems((prevItems) => [...prevItems, {_id, name, price, image, category, itemQuantity: quantity, size}])
    }

    const removeFromCartHandler = (item) => {
        setCartItems(cartItems.filter((prevItem) => prevItem._id !== item._id))
    }

    const calculateTotalAmount = (currentCartItems) => {
        let total = 0
        currentCartItems.forEach((item) => {
            total = total + (item.price * item.itemQuantity)
        })

        setTotalAmountOfItems(total)
    }

    const quantityHandler = (itemId, action) => {
        setCartItems(cartItems.map((item) => {
            if (item._id === itemId) {
                if (action === 'INC') {
                    return { ...item, itemQuantity: item.itemQuantity + 1 };
                } else if (action === 'DEC' && item.itemQuantity > 1) {
                    return { ...item, itemQuantity: item.itemQuantity - 1 };
                }
            }
            return item; // Return other items unchanged
        }));
    };

    useEffect(() => {
        calculateTotalAmount(cartItems)
    }, [cartItems])


    const cartItemCtx = {
        items: cartItems,
        totalAmount: totalAmountOfItems,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        quantity: quantityHandler
    }

    return ( 
        <CartItemsContext.Provider value={cartItemCtx}>
            {props.children}
        </CartItemsContext.Provider>
     );
}
 
export default CartItemsProvider;