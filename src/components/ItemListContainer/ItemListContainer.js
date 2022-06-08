import Alert from 'react-bootstrap/Alert'
import ItemList from '../ItemList/ItemList';
import React, { useEffect } from "react"
import { CartContext } from '../../context/CartContext'
import {getFirestore,collection,getDocs,query,where} from 'firebase/firestore'

export default function ItemListContainer({greeting,category_id}){
    const { addItem } =  React.useContext(CartContext);
    const[productsItems, getProducts] = React.useState([])

    React.useEffect( () => {
        const db = getFirestore();

        // //un producto
        // const productRef = doc(db,"products","JiO9W79H8yDDaqKpHsND")
        // getDoc(productRef).then(snapshot => {
        //     if (snapshot.exists()){
        //         console.log(snapshot.data());
        //     }            
        // })
        if (category_id){
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