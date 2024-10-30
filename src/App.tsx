import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout/MainLayout';
import { Homepage } from './components/Views/Homepage/Homepage';
import { Cart } from './components/Views/Cart/Cart';
import { Product } from './components/Views/Product/Product';
import { NotFound } from './components/Views/NotFound/NotFound';
import { Login } from './components/Views/Login/Login';
import { Logout } from './components/Views/Logout/Logout';
import { MyOrders } from './components/Views/MyOrders/MyOrders';
import ProtectedRoute from './components/Features/ProtectedView/ProtectedView';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path="/myorders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export default App;
