import React, { useState } from 'react';
import {Button,Row,Col} from 'react-bootstrap'

export default function ItemProductCount({item,  onAdd}){
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
        <>
            <Row>
                <Col><button onClick={decreaseCount}> - </button></Col>
                <Col>{count}</Col>
                <Col><button onClick={addCount}> + </button></Col>
            </Row>                                
            <Row>
                <Button variant="primary" onClick={ ()=>onAdd(count,item)}>Agregar al carrito </Button>
            </Row>
        </>
                        
    )
}



