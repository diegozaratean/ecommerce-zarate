import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function ItemCount({ stock, initial,  onAdd }){
    const [count, setCount] = useState(+initial);
    const addCount = () => {
        if (count < stock) {
        setCount(count + 1);
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
                    <Col md={{ span: 4, offset: 4 }}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Camisa Tiger</Card.Title>
                                <Card.Text>
                                Es una camisa increible con la cual quedaras muy satisfecho.
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
                    
                    </Col>
                </Row>
        
                </Container>
        </div>
        

    )
}