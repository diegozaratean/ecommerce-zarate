import Alert from 'react-bootstrap/Alert'
import ItemCount from '../ItemCount/ItemCount'

export default function ItemListContainer({greeting}){
    const addTocart = (count) =>{
        console.log(`add to cart ${count} items`);
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