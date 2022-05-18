import logoImg from '../../assets/logo2.png';
import {Navbar,Container,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import Carticon from '../CartIcon/CartIcon';

export default function Header(){
    
    return(
        <header className="header">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><img alt="logo" src={logoImg}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Novedades</Nav.Link>
                        <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Misterio</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Finanzas</NavDropdown.Item>
                        <NavDropdown.Item href="#action6">Superación personal</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Recomendados
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