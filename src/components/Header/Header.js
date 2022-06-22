import logoImg from '../../assets/logo2.png';
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import Carticon from '../CartIcon/CartIcon';
import { Link } from 'react-router-dom'
import {getFirestore,collection,getDocs,query,where} from 'firebase/firestore'
import React, { useEffect } from "react"


export default function Header(){
    
    const[categories, setCategories] = React.useState([])

    React.useEffect( () => {
        const db = getFirestore(); 
        const categoriesRef = collection(db,"categories")
            getDocs(categoriesRef).then(snapshots => {
                const data = snapshots.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setCategories(data)
            })     
    },[])


    return(
        <header className="header">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/" >
                            <img alt="logo" src={logoImg}/>
                        </Link>
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                                {
                                    categories && categories.map(category => {
                                        return <NavDropdown.Item key={category.id} ><Link to={`/category/${category.slug}`} >{category.name} </Link></NavDropdown.Item>
                                    })
                                }
                        </NavDropdown>                        
                        <NavDropdown title="Admin" id="navbarScrollingDropdown1">
                        <NavDropdown.Item ><Link to="/inventory" >Agregar inventario </Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to="/orders" >Ordenes </Link></NavDropdown.Item>                    
                        </NavDropdown>
                    </Nav>
                    <Carticon />
                    </Navbar.Collapse>
                </Container>
                </Navbar>     
        </header>
    );
}