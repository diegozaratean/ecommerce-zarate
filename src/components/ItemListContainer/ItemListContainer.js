import Alert from 'react-bootstrap/Alert'
import ItemList from '../ItemList/ItemList';
import React, { useEffect } from "react"
import { CartContext } from '../../context/CartContext'
import {getFirestore,collection,getDocs,query,where} from 'firebase/firestore'

export default function ItemListContainer({greeting,category_slug}){
    const { addItem } =  React.useContext(CartContext);
    const[productsItems, getProducts] = React.useState([])
    const [category_id,setCategoryId] = React.useState([])

    React.useEffect( () => {
        const db = getFirestore();
        if (category_slug){
            const categoryQuery = query(collection(db,"categories"),where("slug","==",category_slug))
            getDocs(categoryQuery).then(snapshots => {
                const data = snapshots.docs.map(doc => ({id: doc.id, ...doc.data()}))
                console.log("categories slu")
                console.log(data[0].id);
                setCategoryId(data[0].id)
                console.log(data); 
            })
            //todos los productos por categoria
            const q = query(collection(db,"products"),where("category_id","==",+category_id))
            getDocs(q).then(snapshots => {
                const data = snapshots.docs.map(doc => ({id: doc.id, ...doc.data()}))
                console.log(data);
                getProducts(data)         
            })
        }else{
            //todos los productos
            const productsRef = collection(db,"products")
            getDocs(productsRef).then(snapshots => {
                const data = snapshots.docs.map(doc => ({id: doc.id, ...doc.data()}))
                console.log(data);         
                getProducts(data)
            })            
        }                 
    },[category_slug,category_id])

    return (
        <>           
            <Alert key='success' variant='success'>
                {greeting}
            </Alert>
            <ItemList items = {productsItems} onAdd={addItem}/>
        </>   

    )
}