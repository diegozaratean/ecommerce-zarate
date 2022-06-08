import ItemDetail from "../../components/ItemDetail/ItemDetail"
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"
import {getFirestore,getDoc,doc} from 'firebase/firestore'


export default function Product (){
    const { id } =  useParams();
    console.log(id);
    const[productItem, getProduct] = React.useState([])

    useEffect( () => {
        const db = getFirestore();
        //un producto
        const productRef = doc(db,"products",id)
        getDoc(productRef).then(snapshot => {
            if (snapshot.exists()){
                getProduct(snapshot.data())
                console.log(snapshot.data());
            }            
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