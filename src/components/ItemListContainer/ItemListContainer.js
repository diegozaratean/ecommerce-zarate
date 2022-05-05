import Alert from 'react-bootstrap/Alert'
import ItemCount from '../ItemCount/ItemCount'
import { toast } from "react-toastify";

export default function ItemListContainer({greeting}){
    const addTocart = (count) =>{
        console.log(`add to cart ${count} items`);
        toast.success(`add to cart ${count} items!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    return (
        <>           
            <Alert key='success' variant='success'>
                {greeting}
            </Alert>
            <ItemCount stock='5' initial='1' onAdd={addTocart}/>
        </>   

    )
}