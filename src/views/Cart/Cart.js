import Header from "../../components/Header/Header"
import { CartContext } from '../../context/CartContext'
import React from 'react'
import { Link } from 'react-router-dom'
import {Col,Card,Button,Row,Container} from 'react-bootstrap'
import NumberFormat from "react-number-format"

export default function Cart (){
    const { cart } =  React.useContext(CartContext);
    const { removeItem } =  React.useContext(CartContext);
    const { clear } =  React.useContext(CartContext);
    const { countItems } =  React.useContext(CartContext);
    const { getCartTotal } =  React.useContext(CartContext);
    
    return (
        <>
            <Header/> 
            <div>
                <h1>Cart</h1>
                {!(cart.length > 0) ?                 
                (<>
                    <Container>
                        <Row  className="text-center">
                            <h1>No tienes items en tu carrito</h1>
                            <Link to={`/`} >
                                <Button variant="primary" >Volver a la tienda </Button>
                            </Link>
                        </Row>
                    </Container>
                </>):
                (
                    <>
                        <h1>Tienes {countItems()} productos en tu carrito</h1>           
                        <Container>
                            {cart.map((cartItem) => {
                                return(
                                    <Row key={cartItem.id}>
                                        <Card >
                                            <Row>
                                                <Col md={{ span: 3 }}>
                                                    <Card.Img variant="top" src={cartItem.url} />
                                                </Col>
                                                <Col md={{ span: 2 }}>
                                                    <p>{cartItem.title}</p>
                                                </Col>
                                                <Col md={{ span: 1 }}>
                                                    <p>Cantidad:</p>
                                                    <p>{cartItem.quantity}</p>                                                        
                                                </Col>
                                                <Col md={{ span: 1 }}>
                                                    <p>Precio:</p>
                                                    <p><NumberFormat value={cartItem.price} displayType={'text'}   thousandSeparator={'.'} decimalSeparator={" "} prefix={'$'} /></p>                                                     
                                                </Col>
                                                <Col md={{ span: 1 }}>
                                                    <p>Total:</p>
                                                    <p><NumberFormat value={cartItem.quantity*cartItem.price} displayType={'text'}   thousandSeparator={'.'} decimalSeparator={" "} prefix={'$'} /></p>
                                                </Col>
                                                <Col md={{ span: 3 }}>
                                                    <Button variant="primary" onClick={ ()=>removeItem(cartItem.id)}>Eliminar del carrito </Button>                                                
                                                </Col>
                                            </Row>                                            
                                        </Card>
                                    </Row>
                                )                
                            })}
                            <Row >
                                <Card >
                                    <Row>
                                        <Col md={{ span: 4 , offset: 8  }}>
                                            <p>Total: <b><NumberFormat value={getCartTotal()} displayType={'text'}   thousandSeparator={'.'} decimalSeparator={" "} prefix={'$'} /></b></p>
                                        </Col>                                        
                                    </Row>                                            
                                </Card>
                            </Row>
                        </Container>
                        <Row className="text-center">
                            <Col md={{ span: 4 }}>
                                <Link to={`/`} >
                                    <Button variant="primary" >Volver a la tienda </Button>
                                </Link>
                            </Col>
                            <Col md={{ span: 4 }}>
                                <Button variant="secondary" onClick={ ()=>clear()} >Limpiar Carrito </Button>
                            </Col>
                            <Col md={{ span: 4 }}>
                                <Link to="/checkout" >
                                    <Button variant="success" >Ir a pagar </Button>
                                </Link>
                            </Col>
                        </Row>                        
                    </>                
                )
                 }

            </div>
        </>
        
    );
}