import React, { useState } from 'react';
import {Card,Button,Row,Col} from 'react-bootstrap'
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
            <Card.Img variant="top" src={item.url} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    <b>Precio:</b>{item.price}
                    <p>{item.description}</p>                    
                </Card.Text>
                <Row>
                    <Col><button onClick={decreaseCount}> - </button></Col>
                    <Col>{count}</Col>
                    <Col><button onClick={addCount}> + </button></Col>
                </Row>                                
                <Row>
                    <Button variant="primary" onClick={ ()=>onAdd(count)}>Agregar al carrito </Button>{' '}
                </Row>                                
            </Card.Body>
        </Card>
    )
}



