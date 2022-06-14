import React, { useState } from 'react';
import {Card,Button,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ItemProductCount from '../ItemProductCount/ItemProductCount'

export default function Item({item,  onAdd}){
    const [count, setCount] = useState(1);
    const addCount = () => {
        if (count < item.stock) {
        setCount(count + 1);
        }
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
            }
    }
    return(
        <Card  style={{ width: '18rem' }}>
            <Link to={`/product/${item.id}`} >
                <Card.Img variant="top" src={item.url} />
            </Link>
            <Card.Body>
                <Link to={`/product/${item.id}`} >
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        <b>Precio:</b>{item.price}<br></br>
                        <span>{item.description}</span>
                    </Card.Text>
                </Link>                
                { item.stock > 0 && <ItemProductCount item = {item} onAdd={onAdd}/>} 
            </Card.Body>
        </Card>
    )
}



