import {products} from "../../data/products"
import ItemDetail from "../ItemDetail/ItemDetail"
import React from "react"

export default function ItemDetailtContainer(){

    const[item, setItem] = React.useState([])
    
    const getItem = new Promise((resolve,reject) =>{
        setTimeout(() =>{
            resolve(products);
        },3000)
    }).then(() => {
        console.log("getItem")
        setItem(products[2]);
    }) 


    return (
        <>           
            <ItemDetail item = {item} />
        </>   

    )

}
