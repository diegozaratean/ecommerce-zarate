import {products} from "../../data/products"
import ItemDetail from "../../components/ItemDetail/ItemDetail"
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"

export default function Product (){
    const { id } =  useParams();
    console.log(id);
    const[productItem, getProduct] = React.useState([])

    useEffect( () => {
        const getProductTask = new Promise((resolve,reject) =>{
            setTimeout(() =>{
                resolve();
            },300)
        })
        getProductTask.then((result) =>{
            console.log(result);
            console.log("p1");
            console.log(products);
            console.log("p2");
            console.log(products.find(item => item.id === +id));
            console.log("id");
            console.log(id);
            getProduct(products.find(item => item.id === +id))
        })
    },[id])
    return (
        <>
            <Header/> 
            <div>
                <h1>Product</h1>
                <ItemDetail item={productItem}  />   
            </div>
        </>        
    );
}