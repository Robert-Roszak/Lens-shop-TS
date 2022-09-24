import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Views/MainLayout/MainLayout';
import { Homepage } from './components/Views/Homepage/Homepage';
import { Cart } from './components/Views/Cart/Cart';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
