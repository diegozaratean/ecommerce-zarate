import {Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ItemCount from '../ItemCount/ItemCount'
import { toast } from "react-toastify";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import React, { useEffect } from "react"
import ItemProductCount from '../ItemProductCount/ItemProductCount'


export default function ItemDetail({item}){
	let navigate = useNavigate();
	const [quantityToAdd, setQuantityToAdd] = useState(1);
	const [itemAdded, setItemAdded] = useState(false);
	const { addItem } =  React.useContext(CartContext);


	const onAdd = (quantityToAdd) => {
		// Hemos recibido un evento del ItemCount
        toast.success(`add to cart ${quantityToAdd} items!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
		setItemAdded(true)
	}

	const goToCart = (event) =>{
		event.preventDefault();
		navigate("/cart", { replace: true });
	}

    return(
        <Card  >
            <div className="container-fliud">
				<div className="wrapper row">
					<div className="preview col-md-6">
						
						<div className="preview-pic tab-content">
						  <div className="tab-pane active" id="pic-1"><img alt="productimage1" src={item.url} /></div>
						  {/* <div className="tab-pane" id="pic-2"><img src={item.url} /></div>
						  <div className="tab-pane" id="pic-3"><img src={item.url}/></div>
						  <div className="tab-pane" id="pic-4"><img src={item.url}/></div>
						  <div className="tab-pane" id="pic-5"><img src={item.url}/></div> */}
						</div>
						<ul className="preview-thumbnail nav nav-tabs">
						  <li className="active"><img alt="productimage2" src={item.url} /></li>
						  <li><img alt="productimage3" src={item.url} /></li>
						  <li><img alt="productimage4" src={item.url} /></li>
						</ul>
						
					</div>
					<div className="details col-md-6">
						<h3 className="product-title">{item.title}</h3>
						<div className="rating">
							<div className="stars">
								<span className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></span>
								<span className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></span>
								<span className="fa fa-star checked"><FontAwesomeIcon icon={faStar} /></span>
								<span className="fa fa-star"><FontAwesomeIcon icon={faMinus} /> </span>
								<span className="fa fa-star"><FontAwesomeIcon icon={faMinus} /></span>
							</div>
							<span className="review-no">41 calificaciones</span>
						</div>
						<p className="product-description">{item.description}</p>
						<h4 className="price">precio actual: <span>${item.price}</span></h4>
						<p className="vote"><strong>91%</strong> de los lectores disfrutaron este producto! <strong>(87 votos)</strong></p>
						<h5 className="colors">color portada:
							<span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
							<span className="color green"></span>
							<span className="color blue"></span>
						</h5>
						<div className="action">
							<ItemProductCount item = {item} onAdd={addItem}/>
							{/* {itemAdded ? <Button variant="primary" onClick={goToCart} >Ir al carrito </Button> : <ItemCount stock={item.stock} initial='1' onAdd={() => addItem(quantityToAdd,item)}/>} */}
							{/* <ItemCount stock={item.stock} initial='1' onAdd={() => setQuantityToAdd(quantityToAdd)}/>
							<Button variant="primary" onClick={ ()=>addItem(quantityToAdd,item)}>Agregar al carrito </Button> */}
							{/* <ItemCount stock='5' initial='1' onAdd={onAdd}/>
                            <Button variant="primary" >Agregar al carrito </Button>{' '}
							<Button variant="primary" onClick={goToCart} >Ir al carrito </Button>{' '}
                            <Button variant="primary" ><FontAwesomeIcon icon={faHeart} /> </Button>{' '} */}
						</div>
					</div>
				</div>
			</div>
        </Card>
    )
}
