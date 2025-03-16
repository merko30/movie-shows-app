import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router';

import Detail from './pages/Detail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import MovieProvider from './context/Movie';

function App() {
  return (
    <>
      <MovieProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path="/" index />
            <Route element={<Detail />} path="/:type/:id" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </>
  );
}

export default App;
