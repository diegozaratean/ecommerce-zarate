import Header from "../../components/Header/Header"
import { CartContext } from '../../context/CartContext'
import React from 'react'
import { Link } from 'react-router-dom'
import {Col,Card,Button,Row,Container} from 'react-bootstrap'

export default function Cart (){
    const { cart } =  React.useContext(CartContext);
    const { removeItem } =  React.useContext(CartContext);
    const { clear } =  React.useContext(CartContext);
    const { countItems } =  React.useContext(CartContext);
    
    console.log(cart);
    console.log(countItems());
    return (
        <>
            <Header/> 
            <div>
                {/* <ItemDetailtContainer />
                <ItemListContainer greeting={'Bienvenido a la tienda z commerce'} category_id={0} />    */}
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
                        <h1>Tienes {countItems()} elementos en tu carrito</h1>                        
                        <Container>
                            {cart.map((cartItem) => {
                                return(
                                    <>
                                        <Row>
                                        <Card >
                                            <Row>
                                                <Col md={{ span: 3 }}>
                                                    <Card.Img variant="top" src={cartItem.url} />
                                                </Col>
                                                <Col md={{ span: 3 }}>
                                                    <p>{cartItem.title}</p>
                                                </Col>
                                                <Col md={{ span: 3 }}>
                                                    <p>Cantidad:</p>
                                                    <p>{cartItem.quantity}</p>                                                        
                                                </Col>
                                                <Col md={{ span: 3 }}>
                                                    <Button variant="primary" onClick={ ()=>removeItem(cartItem.id)}>Eliminar del carrito </Button>                                                
                                                </Col>
                                            </Row>                                            
                                        </Card>
                                        </Row>                                        
                                    </>
                                )                
                            })}

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
                                <Button variant="success" >Ir a pagar </Button>
                            </Col>
                        </Row>                        
                    </>                
                )
                 }

            </div>
        </>
        
    );
}