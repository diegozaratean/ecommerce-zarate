export default function Carticon({count}){
    return(
        <div className="carticon-holder" >
            {count}
            <img className="carticon" src="/images/cart2.png"/>
        </div>
    )
}