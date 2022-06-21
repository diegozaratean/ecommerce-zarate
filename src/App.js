import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Home from "./views/Home/Home"
import Cart from "./views/Cart/Cart"
import Products from "./views/Products/Products"
import Product from "./views/Product/Product"
import Categories from "./views/Categories/Categories"
import Checkout from './views/Checkout/Checkout'
import Order from './views/Order/Order'
import Inventory from './views/Inventory/Inventory'

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/products' element={<Products />}></Route>
            <Route exact path='/cart' element={<Cart />}></Route>
            <Route exact path='/product/:id' element={<Product />}></Route>
            <Route exact path='/category/:id' element={<Categories />}></Route>
            <Route exact path='/checkout' element={<Checkout />}></Route>
            <Route exact path='/order/:id' element={<Order />}></Route>
            <Route exact path='/inventory' element={<Inventory />}></Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
