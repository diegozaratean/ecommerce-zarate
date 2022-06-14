import Header from "../../components/Header/Header"
import { CartContext } from '../../context/CartContext'
import React from 'react'
import {Form,Button,Container} from 'react-bootstrap'
import { doc,runTransaction,addDoc,collection,getFirestore} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Checkout (){
	let navigate = useNavigate();
    const { cart } =  React.useContext(CartContext)
    const [data, setData] =  React.useState()
    const [orderId,setOrderId] = React.useState()
    const { getCartTotal } =  React.useContext(CartContext);
    const { clear } =  React.useContext(CartContext);

    console.log(data)
    console.log(orderId)

    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data,[name]: value});        
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const order = {
            buyer: data,
            items: cart,
            total: getCartTotal()
        }
        const db = getFirestore()
        const orderCollection = collection(db,"orders")
        await addDoc(orderCollection,order).then(({id}) => 
            {
                setOrderId(id)
            }
        )
    }

    React.useEffect(() => {
        if (orderId && getCartTotal() > 0) {
          console.log(orderId)
          updateProducts()
        }
      }, [orderId]);

    const updateProducts = async () => {
        const db = getFirestore ()
        await cart.forEach( async (item) => {
          const productRef = doc(db, `products`, item.id)
          await runTransaction(db, async (transaction) => {
            const transfDoc = await transaction.get(productRef);
            console.log(item.id)
            console.log(productRef)
            if (!transfDoc.exists()) {
                console.error("El documento no existe")
            }
            const newStock = transfDoc.data().stock - item.quantity;
            transaction.update(productRef, { stock: newStock });
            //Clear cart and redirect to order page
            clear()
            navigate(`/order/${orderId}`, { replace: true });
        });
        })
      }

    return (
        <>
            <Header/> 
            <div>
                <h1>Checkout</h1>
                <Container> 
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter email" onChange={handleChange}/>                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange}/>
                            <Form.Text className="text-muted" >
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="confiremail" type="email" placeholder="Enter email" onChange={handleChange} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name="phone" type="number" placeholder="Enter phone" onChange={handleChange}/>                            
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
        
    );
}