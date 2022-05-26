import Alert from 'react-bootstrap/Alert'
import {products} from "../../data/products"
import ItemList from '../ItemList/ItemList';
import React, { useEffect } from "react"
import { CartContext } from '../../context/CartContext'


export default function ItemListContainer({greeting,category_id}){
    const { addItem } =  React.useContext(CartContext);
    const[productsItems, getProducts] = React.useState([])

    useEffect( () => {
        const getProductsTask = new Promise((resolve,reject) =>{
            setTimeout(() =>{
                resolve();
            },3000)
        })
        getProductsTask.then((result) =>{
            console.log(result);
            if (category_id){
                getProducts(products.filter(item => item.category === +category_id))
            }else{
                getProducts(products)
            }
        })
    },[category_id])
    


    return (
        <>           
            <Alert key='success' variant='success'>
                {greeting}
            </Alert>
            {/* <ItemCount stock='5' initial='1' onAdd={addTocart}/> */}
            <ItemList items = {productsItems} onAdd={addItem}/>
        </>   

    )
}