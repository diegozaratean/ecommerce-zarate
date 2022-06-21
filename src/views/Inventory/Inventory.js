import Header from "../../components/Header/Header";
import React, { useEffect } from "react"
import {getFirestore,collection,getDocs,doc,runTransaction} from 'firebase/firestore'
import {Row,Container,Col,Card,Button,Form} from 'react-bootstrap'
import NumberFormat from "react-number-format"


export default function Inventory (){
    const[productsItems, getProducts] = React.useState([])

    const getFirebaseProducts = () => {
        const db = getFirestore();
        //todos los productos
        const productsRef = collection(db,"products")
        getDocs(productsRef).then(snapshots => {
            const data = snapshots.docs.map(doc => ({id: doc.id, ...doc.data()}))
            getProducts(data)
        })
    }
    
    React.useEffect( () => {        
        getFirebaseProducts()
    },[])
    
    const handleSubmit = async (event,productId) =>{
        event.preventDefault();
        console.log("handleSubmit");
        console.log(productId);
        console.log( document.getElementsByName('name'+productId)[0].value);
        const db = getFirestore ()
        const productRef = doc(db, `products`, productId)
        await runTransaction(db, async (transaction) => {
            const transfDoc = await transaction.get(productRef);
            console.log(productRef)
            if (!transfDoc.exists()) {
                console.error("El documento no existe")
            }
            const newStock = +transfDoc.data().stock + (+document.getElementsByName('name'+productId)[0].value);
            transaction.update(productRef, { stock: newStock });            
        });
        getFirebaseProducts()
    }
    return (
        <>
            <Header/> 
            <div>
                <h1>Agregar inventario</h1>
                <Container>
                    {productsItems.map((product) => {
                        return(
                            <Row key={product.id}>
                                <Card >
                                    <Row>
                                        <Col md={{ span: 3 }}>
                                            <Card.Img variant="top" src={product.url} />
                                        </Col>
                                        <Col md={{ span: 2 }}>
                                            <p>{product.title}</p>
                                        </Col>
                                        <Col md={{ span: 2 }}>
                                            <p>Cantidad Actual:</p>
                                            <p>{product.stock}</p>                                                        
                                        </Col>                                                                
                                        <Col md={{ span: 3 }}>
                                            <Form key={product.id} onSubmit={(event)=>handleSubmit(event,product.id)}>                                                
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Cantidad a agregar:</Form.Label>
                                                    <Form.Control name={`name${product.id}`} type="number" placeholder="stock a sumar: ej 1" maxLength="15" pattern="\d{15}" title="Please enter exactly 15 digits"/>                            
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Agregar Stock
                                                </Button>
                                            </Form>
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