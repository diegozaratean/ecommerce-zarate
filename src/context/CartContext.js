import React from 'react'
import { toast } from "react-toastify";

const CartContext =  React.createContext();
const {Provider} = CartContext

const CartProvider = ({children}) => {
    const [cart,setCart] = React.useState([])

    const addItem = (count,item) => {
        console.log(cart);
        toast.success(`add to cart ${count} items!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        if (isInCart(item.id)){
            const newCart =  cart.map(cartItem =>{
                if (cartItem.id === item.id){
                    cartItem.quantity+=count
                }
                return cartItem
            }
            )
            setCart(newCart)
        }else{
            setCart([...cart, {...item, quantity: count}])
        }
    }

    const removeItem = (id) => {
        const newCart =  cart.filter( (cartItem) => cartItem.id !==  id)
        setCart(newCart)
    }

    const clear = () => {
        setCart([])
    }

    const isInCart = (id) => {        
        return cart.find(item => item.id === id)
    }
    const countItems = () => {    
        console.log('se ejecuto 1');
        let cartQuantity = 0
        cart.map( (cartItem) => {
            (
                cartQuantity = cartQuantity + cartItem.quantity
            )      
        }
        )
        return cartQuantity
    }
    return (
        <Provider value={{
            addItem,
            removeItem,
            clear,
            isInCart,
            countItems,
            cart
        }}>{children}</Provider>
    )
}

export {CartContext,CartProvider}
