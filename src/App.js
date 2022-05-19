import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from "./views/Home/Home"
import Cart from "./views/Cart/Cart"
import Products from "./views/Products/Products"
import Product from "./views/Product/Product"
import Categories from "./views/Categories/Categories"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/products' element={<Products />}></Route>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route exact path='/product/:id' element={<Product />}></Route>
          <Route exact path='/category/:id' element={<Categories />}></Route>
        </Routes>        
      </BrowserRouter>
    </>
  );
}

export default App;
