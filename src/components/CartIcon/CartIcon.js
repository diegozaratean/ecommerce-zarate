import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Carticon({count}){
    return(
        <div className="carticon-holder" >
            <span>{count}</span>
            <FontAwesomeIcon icon={faCartShopping} />
            <img alt="carticon" className="carticon" src="/images/cart2.png"/>

        </div>
    )
}