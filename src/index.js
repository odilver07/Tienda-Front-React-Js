import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClienteForm from './components/ClienteForm';
import Tienda from './components/Tienda';
import TiendaForm from './components/TiendaForm';
import Articulo from './components/Articulo';
import ArticuloForm from './components/ArticuloForm';
import Navbar from './components/NavBar';
import Cliente from './components/Cliente';
import Carrito from './components/Carrito';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path='/edit/:id' element={<ClienteForm/>} />
          <Route path='/add/cliente' element={<ClienteForm/>} />
          <Route path='/tienda' element={<Tienda/>} />
          <Route path='/edit/tienda/:id' element={<TiendaForm/>} />
          <Route path='/add/tienda' element={<TiendaForm/>} />
          <Route path='/articulo' element={<Articulo/>} />
          <Route path='/add/articulo' element={<ArticuloForm/>} />
          <Route path='/edit/articulo/:id' element={<ArticuloForm/>} />
          <Route path='/carrito' element={<Carrito/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
