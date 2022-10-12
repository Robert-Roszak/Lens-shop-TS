import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout/MainLayout';
import { Homepage } from './components/Views/Homepage/Homepage';
import { Cart } from './components/Views/Cart/Cart';
import { Product } from './components/Views/Product/Product';
import { NotFound } from './components/Views/NotFound/NotFound';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
