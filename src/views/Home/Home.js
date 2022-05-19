import Header from "../../components/Header/Header";
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'

export default function Home (){
    return (
        <>
            <Header/> 
            <div>
                <h1>Home</h1>
                <ItemListContainer greeting={'Bienvenido a Zarate / Los mejores libros'}  />   
            </div>
        </>        
    );
}