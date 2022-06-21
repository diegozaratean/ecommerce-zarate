import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom"
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'
 

export default function Categories (){
    const { id } =  useParams();
    console.log(id);
    
    return (
        <>
            <Header/> 
            <div>
                <h1>Categorias</h1>
                <ItemListContainer greeting={'Bienvenido a la categoria'} category_slug={id} />   
            </div>
        </>        
    );
}