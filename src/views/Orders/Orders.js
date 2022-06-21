import Header from "../../components/Header/Header";
import React, { useEffect } from "react"
import {getFirestore,collection,getDocs,doc,runTransaction} from 'firebase/firestore'
import {Row,Container,Col,Card,Button,Form} from 'react-bootstrap'
import { useNavigate,Link } from 'react-router-dom'

export default function Orders (){
    let navigate = useNavigate();
    const[orders, getOrders] = React.useState([])
    
    React.useEffect( () => {        
        const db = getFirestore();
        const ordersRef = collection(db,"orders")
        getDocs(ordersRef).then(snapshots => {
            const data = snapshots.docs.map(doc => ({id: doc.id, ...doc.data()}))
            getOrders(data)
        })
    },[])

    const goToOrder = (orderId) => {
        navigate(`/order/${orderId}`, { replace: true });
    }
    
    return (
        <>
            <Header/> 
            <div>
                <h1>Todas las ordenes</h1>
                <Container>
                    {orders.map((order) => {
                        return(
                            <Row key={order.id}>
                                <Card >
                                    <Row>
                                        <Col md={{ span: 4 }}>
                                            <p>{order.buyer.name}</p>
                                        </Col>
                                        <Col md={{ span: 4 }}>
                                            <p>{order.total}</p>
                                        </Col>                                        
                                        <Col md={{ span: 4 }}>
                                            <Link to={`/order/${order.id}`} >
                                                <Button variant="primary" type="submit" onClick={() => goToOrder(order.id)}>
                                                    Ver orden
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>                                            
                                </Card>
                            </Row>
                        )                
                    })}                            
                </Container>
            </div>
        </>        
    );
}