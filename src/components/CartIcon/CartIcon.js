import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Carticon({count}){
    return(
        <div className="carticon-holder" >
            <span>{count}</span>
            <Link to="/cart" >                            
                <FontAwesomeIcon icon={faCartShopping} />
                <img alt="carticon" className="carticon" src="/images/cart2.png"/>
            </Link>

        </div>
    )
}