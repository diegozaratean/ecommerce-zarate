import {products} from "../../data/products"
import ItemDetail from "../ItemDetail/ItemDetail"
import React, { useEffect } from "react"


export default function ItemDetailtContainer(){

    const[item, setItem] = React.useState([])
    const[productsItems, getProducts] = React.useState(products)

    useEffect( () => {
        const getProductsTask = new Promise((resolve,reject) =>{
            setTimeout(() =>{
                console.log (products);
                resolve(getProducts(products));
                console.log (productsItems);
            },3000)
        })
        getProductsTask.then((result) =>{
            console.log(result);
            setItem(productsItems[2]);
            console.log(item);
        })
    },[productsItems,item])

    return (
        <>           
            <ItemDetail item = {item} />
        </>   

    )

}
