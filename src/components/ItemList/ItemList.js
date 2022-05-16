import Item from "../Item/Item"
import {Row,Container,Col} from 'react-bootstrap'

export default function ItemList({items,  onAdd}){
    return(        
        <div>
            <Container>
                <Row>
                    {items.map((product) => {
                        return(
                            <Col key={product.id} md={{ span: 4 }}>
                                <Item key={product.id} item = {product} onAdd={onAdd}/>                
                            </Col>
                        )                
                    })}
                </Row>
            </Container>
        </div>
    )
}



