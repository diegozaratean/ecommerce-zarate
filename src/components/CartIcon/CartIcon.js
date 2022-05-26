import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import React from 'react'

export default function Carticon({count}){
    const { cart } =  React.useContext(CartContext);
    return(
        <div className="carticon-holder" >
            <span>{cart.length}</span>
            <Link to="/cart" >                            
                <FontAwesomeIcon icon={faCartShopping} />
                <img alt="carticon" className="carticon" src="/images/cart2.png"/>
            </Link>

        </div>
    )
}