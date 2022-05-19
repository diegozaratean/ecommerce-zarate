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
                <h1>Categories</h1>
                <ItemListContainer greeting={'Bienvenido a la categroia'} category_id={id} />   
            </div>
        </>        
    );
}