import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"
import {getFirestore,getDoc,doc} from 'firebase/firestore'
import {Col,Card,Button,Row,Container} from 'react-bootstrap'
import NumberFormat from "react-number-format"

export default function Order (){
    const { id } =  useParams();
    const[order, getOrder] = React.useState([])

    useEffect( () => {
        const db = getFirestore();
        //Get one order
        const orderRef = doc(db,"orders",id)
        getDoc(orderRef).then(snapshot => {
            if (snapshot.exists()){
                getOrder(snapshot.data())
            }            
        })
    },[id])
    return (
        <>
            <Header/> 
            <div>
                {!(order.total) ?
                (<>
                    <h1>No se encontró la Orden</h1>    
                </>):
                (<>
                    <h1>Orden</h1>
                    <Container>
                        <Row >
                            <Card >
                                <Row>
                                    <Col md={{ span: 4 }}>
                                        <p className="text-center">Nombre: <b>{order.buyer.name}</b></p>
                                    </Col>
                                    <Col md={{ span: 4 }}>
                                        <p className="text-center">Telefono: <b>{order.buyer.phone}</b></p>
                                    </Col>
                                    <Col md={{ span: 4 }}>
                                        <p className="text-center">Correo: <b>{order.buyer.email}</b></p>
                                    </Col>
                                </Row>                                            
                            </Card>
                        </Row>
                        {order.items.map((cartItem) => {
                            return(
                                <>
                                    <Row key={cartItem.id}>
                                    <Card >
                                        <Row>
                                            <Col md={{ span: 3 }}>
                                                <Card.Img variant="top" src={cartItem.url} />
                                            </Col>
                                            <Col md={{ span: 3 }}>
                                                <p>{cartItem.title}</p>
                                            </Col>
                                            <Col md={{ span: 2 }}>
                                                <p>Cantidad:</p>
                                                <p>{cartItem.quantity}</p>                                                        
                                            </Col>
                                            <Col md={{ span: 2 }}>
                                                <p>Precio:</p>
                                                <p><NumberFormat value={cartItem.price} displayType={'text'}   thousandSeparator={'.'} decimalSeparator={" "} prefix={'$'} /></p>                                                     
                                            </Col>
                                            <Col md={{ span: 2 }}>
                                                <p>Total:</p>
                                                <p><NumberFormat value={cartItem.quantity*cartItem.price} displayType={'text'}   thousandSeparator={'.'} decimalSeparator={" "} prefix={'$'} /></p>
                                            </Col>                                            
                                        </Row>                                            
                                    </Card>
                                    </Row>                                        
                                </>
                            )                
                        })}
                        <Row >
                            <Card >
                                <Row>
                                    <Col md={{ span: 2 , offset: 10  }}>
                                        <p>Total: <b><NumberFormat value={order.total} displayType={'text'}   thousandSeparator={'.'} decimalSeparator={" "} prefix={'$'} /></b></p>
                                    </Col>                                        
                                </Row>                                            
                            </Card>
                        </Row>
                    </Container>
                </>)
                }                
            </div>
        </>        
    );
}