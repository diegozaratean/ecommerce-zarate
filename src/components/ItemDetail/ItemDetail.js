import React, { useState } from 'react';
import {Card,Button,Row,Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function ItemDetail({item}){
    return(
        <Card  >
            <div className="container-fliud">
				<div className="wrapper row">
					<div className="preview col-md-6">
						
						<div className="preview-pic tab-content">
						  <div className="tab-pane active" id="pic-1"><img src={item.url} /></div>
						  {/* <div className="tab-pane" id="pic-2"><img src={item.url} /></div>
						  <div className="tab-pane" id="pic-3"><img src={item.url}/></div>
						  <div className="tab-pane" id="pic-4"><img src={item.url}/></div>
						  <div className="tab-pane" id="pic-5"><img src={item.url}/></div> */}
						</div>
						<ul className="preview-thumbnail nav nav-tabs">
						  <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={item.url} /></a></li>
						  <li><a data-target="#pic-2" data-toggle="tab"><img src={item.url} /></a></li>
						  <li><a data-target="#pic-3" data-toggle="tab"><img src={item.url} /></a></li>
						  <li><a data-target="#pic-4" data-toggle="tab"><img src={item.url} /></a></li>
						  <li><a data-target="#pic-5" data-toggle="tab"><img src={item.url} /></a></li>
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
                            <Button variant="primary" >Agregar al carrito </Button>{' '}
                            <Button variant="primary" ><FontAwesomeIcon icon={faHeart} /> </Button>{' '}							
						</div>
					</div>
				</div>
			</div>
        </Card>
    )
}
