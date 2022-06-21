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
    const [validateEmail,setValidateEmail] = React.useState(false)

    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data,[name]: value});   
        document.getElementsByName("email")[0].value !== document.getElementsByName("confiremail")[0].value ?
        setValidateEmail(true)
         : setValidateEmail(false)

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
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Ingresa nombe: ej Jhon" onChange={handleChange}/>                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Ingresa email: ej john@doe.com " onChange={handleChange}/>                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Confirmar Email</Form.Label>
                            <Form.Control name="confiremail" type="email" placeholder="Confirma tu  email" onChange={handleChange} />
                            { validateEmail && <Form.Text className="text-error">
                            Los emails no coinciden!
                            </Form.Text>}
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control name="phone" type="number" placeholder="Ingresa telefono: ej 31012345678" onChange={handleChange}/>                            
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Comprar
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
        
    );
}