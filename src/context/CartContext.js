import React from 'react'
import { toast } from "react-toastify";

const CartContext =  React.createContext();
const {Provider} = CartContext

const CartProvider = ({children}) => {
    const [cart,setCart] = React.useState([])

    React.useEffect( () => {
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    const defineCart = (newCart) => {
        setCart(newCart)
    }

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

    const changeStockItem = (id,newStock) => {
        const newCart =  cart.map(cartItem =>{
            if (cartItem.id === id){
                cartItem.quantity=newStock
            }
            return cartItem
        }
        )
        setCart(newCart)
    }

    const clear = () => {
        setCart([])
    }

    const isInCart = (id) => {        
        return cart.find(item => item.id === id)
    }
    const countItems = () => {    
        let cartQuantity = 0
        cart.map( (cartItem) => {
            (
                cartQuantity = cartQuantity + cartItem.quantity
            )      
        }
        )
        return cartQuantity
    }

    const getCartTotal = () =>{
        let cartTotal = 0
        cart.map( (cartItem) => {
            (
                cartTotal = cartTotal + (cartItem.quantity*cartItem.price)
            )      
        }
        )
        return cartTotal
    }
    return (
        <Provider value={{
            addItem,
            removeItem,
            clear,
            isInCart,
            countItems,
            getCartTotal,
            defineCart,
            changeStockItem,
            cart
        }}>{children}</Provider>
    )
}

export {CartContext,CartProvider}
