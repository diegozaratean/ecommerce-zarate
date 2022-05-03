export default function Carticon({count}){
    return(
        <div className="carticon-holder" >
            {count}
            <img alt="carticon" className="carticon" src="/images/cart2.png"/>
        </div>
    )
}