// import './App.css';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2'
import Navbar from './NavBar';
import { useNavigate} from "react-router-dom";
// import './config.js';

function Carrito() {
  const articuloLocal = JSON.parse(localStorage.getItem('carStored'));
  const connection = global.config.conn.api.connection+'/Articulo';
  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem("login");
  if (isLogin == null) window.location = "/login"

  let idArticulos = []
  let articulosObj = []
  if (articuloLocal) {
    articuloLocal.forEach(element => {
      idArticulos.push(element.codigo);
    });
    const dataArr = new Set(idArticulos);
    let result = [...dataArr];

    console.log(result)
    result.forEach(r => {
      let artObj = articuloLocal.find(t => t.codigo == r)
      let obj = {
        "articulo": artObj,
        "cantidad": 0
      }
      articuloLocal.forEach(element => {
        if (element.codigo == r) {
          obj.cantidad = obj.cantidad + 1;
        }
      });

      articulosObj.push(obj)
    })
    console.log(articulosObj)
  }

  const GuardarArticulos = async (codigo) => {
    let datos = sessionStorage.getItem("login");
    let clienteArt =
    {
      "Id": 0,
      "Cliente": datos,
      "Articulo": codigo
    }
    await axios.post(global.config.conn.api.connection+'/ClienteArticulo', clienteArt)
      .then(() => {
        console.log("todo bien")
        articulosObj = articulosObj.filter(function(i) { return i.articulo.codigo !== codigo })
        localStorage.setItem('carStored',JSON.stringify(articulosObj));
        navigate("/carrito")
      })
  }
  return (
    <>
      <Navbar></Navbar>
      <div class="container mt-3">

        <div class="row">
          {articuloLocal && articulosObj.map(a => (
            <div class="col-sm-4 mt-2">
              <div class="card" >
                <img src={`data:${a.articulo.extesionImagen};base64,${a.articulo.imagen}`} class="img" alt='no-image' />
                <div class="card-body">
                  <h5 class="card-title">{a.articulo.descripcion}</h5>
                  <h5 class="card-title">{a.articulo.precio}</h5>
                  <p class="card-text">{a.cantidad}</p>
                  <button class="btn btn-primary" onClick={e => GuardarArticulos(a.articulo.codigo)}>Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Carrito;