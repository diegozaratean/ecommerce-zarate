import Alert from 'react-bootstrap/Alert'

export default function ItemListContainer({greeting}){
    return (
        <>           
            <Alert key='success' variant='success'>
                {greeting}
            </Alert>
        </>        
    )
}