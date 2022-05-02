import logoImg from '../../assets/logo.png';
import Carticon from '../CartIcon/CartIcon';

export default function Navbar(){
    const linkstyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        listStyle: "none"
    }
    return(
        <header className="header">
            <div className="logo">
                <img src={logoImg}/>
            </div>
            <ul className="links" style = {linkstyle}>
                <li>Inicio</li>
                <li>Vehiculos</li>
                <li>Electroncia</li>
                <li>Libros</li>
                <li>Login</li>
            </ul>
        <Carticon count={2} />
        </header>
    );
}