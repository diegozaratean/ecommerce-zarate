import Navbar from "./components/Navbar/Navbar"
import ItemListContainer from './components/ItemListContainer/ItemListContainer'



function App() {
  return (
    <>
      <Navbar/> 
      <ItemListContainer greeting={'Bienvenido a la tienda z commerce'} />   
    </>
  );
}

export default App;
