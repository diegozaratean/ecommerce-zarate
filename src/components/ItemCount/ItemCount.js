import React, { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



export default function ItemCount({ stock, initial,  onAdd }){
    const [count, setCount] = useState(+initial);

    useEffect( () => {
        setCount(count);
    },[count])

    const addCount = () => {
        if (count < stock) {
            setCount(count + 1);
            onAdd(count);
        }
    };
    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
            }
    }

    
    return(
        <div>                    
            <Container>

                                <Row>
                                    <Col><button onClick={decreaseCount}> - </button></Col>
                                    <Col>{count}</Col>
                                    <Col><button onClick={addCount}> + </button></Col>
                                </Row>                                
        
                </Container>
        </div>
        

    )
}