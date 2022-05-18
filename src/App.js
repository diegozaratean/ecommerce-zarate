import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailtContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Header from "./components/Header/Header";



function App() {
  return (
    <>
      <Header/> 
      <ItemDetailtContainer />
      <ItemListContainer greeting={'Bienvenido a la tienda z commerce'} />   
    </>
  );
}

export default App;
