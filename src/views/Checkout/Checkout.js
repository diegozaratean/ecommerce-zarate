import Header from "../../components/Header/Header"
import { CartContext } from '../../context/CartContext'
import React from 'react'
import {Form,Button,Container,Row,Col} from 'react-bootstrap'
import { getDoc,doc,runTransaction,addDoc,collection,getFirestore} from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "react-toastify";

export default function Checkout (){
	let navigate = useNavigate();
    const { cart,getCartTotal,removeItem,clear,changeStockItem } =  React.useContext(CartContext)
    const [data, setData] =  React.useState()
    const [orderId,setOrderId] = React.useState()
    const [validateEmail,setValidateEmail] = React.useState(false)

    const handleChange =  (event) => {
        const {name, value} = event.target;
        setData({...data,[name]: value});   
        document.getElementsByName("email")[0].value !== document.getElementsByName("confiremail")[0].value ?
        setValidateEmail(true)
         : setValidateEmail(false)
    }

    const validateStock = async (order) => {
        // fetching all documents by mapping an array of promises and using Promise.all()
        const itemsDocs = await Promise.all(cart.map(c => getDoc(doc(getFirestore(), 'products', c.id))))
        // mapping array of document data
        const stockItems = itemsDocs.map(i =>
            {return {id: i._document.key.path.segments[6],stock: i.data().stock}}
        )

        let outOfStock = 0
        cart.forEach( (item) => {
            if (item.quantity > stockItems.find(element => element.id = item.id ).stock)
            {
                outOfStock += 1
                if (stockItems.find(element => element.id = item.id ).stock == 0)
                {
                    //remove item or quantity from cart
                    removeItem(item.id)
                    toast.error(`Se elimino el producto ${item.title} del carrito por que ya no quedan existencias!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }else{
                    //update stock
                    let newStock = item.quantity - stockItems.find(element => element.id = item.id ).stock
                    changeStockItem(item.id,stockItems.find(element => element.id = item.id ).stock)
                    toast.warn(`Se descontaron ${newStock} items del producto ${item.title}, por que ya no quedan existencias!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
        })
        if (outOfStock == 0)
        {
            const orderCollection = collection(getFirestore(),"orders")
            await addDoc(orderCollection,order).then(({id}) => { setOrderId(id)})
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const order = {
            buyer: data,
            items: cart,
            total: getCartTotal()
        }
        validateStock(order)
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
                        <Container>
                        <Row className="text-center">
                            <Col md={{ span: 6 }}>
                                <Link to={`/cart`} >
                                    <Button variant="secondary" >Volver al carrito </Button>
                                </Link>
                            </Col>
                            <Col md={{ span: 6 }}>
                                { !validateEmail &&
                                    <Button variant="primary" type="submit">
                                        Comprar
                                    </Button>
                                }
                            </Col>
                        </Row>
                        </Container>
                    </Form>
                </Container>
            </div>
        </>
        
    );
}