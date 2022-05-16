import Navbar from "./components/Navbar/Navbar"
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailtContainer from "./components/ItemDetailContainer/ItemDetailContainer";



function App() {
  return (
    <>
      <Navbar/> 
      <ItemDetailtContainer />
      <ItemListContainer greeting={'Bienvenido a la tienda z commerce'} />   
    </>
  );
}

export default App;
