import logoImg from '../../assets/logo2.png';
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import Carticon from '../CartIcon/CartIcon';
import { Link } from 'react-router-dom'


export default function Header(){
    
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
                        <Nav.Link><Link to="/" >Home</Link></Nav.Link>                        
                        <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                        <NavDropdown.Item ><Link to="/category/1" >Misterio </Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to="/category/2" >Finanzas </Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to="/category/3" >Superación personal </Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item >
                        <Link to="/products/" >Recomendados </Link>
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                    <Carticon count={2} />
                    </Navbar.Collapse>
                </Container>
                </Navbar>     
        </header>
    );
}