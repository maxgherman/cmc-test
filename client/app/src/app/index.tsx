import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '@src/context/user-context';
import { APIProvider } from '@src/context/api-context'
import { CartProvider } from '@src/context/cart-context'
import { Layout } from '@src/components/layout'
import { Home } from '@src/pages/home'
import { Login } from '@src/pages/login'
import { Checkout } from '@src/pages/checkout'
import { Cart } from '@src/pages/cart'

export const App = () => (
  <Router>
    <APIProvider>
      <UserProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Layout>
        </CartProvider>
      </UserProvider>
      </APIProvider>
  </Router>
);
