import './App.css';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2'
import Navbar from './components/NavBar';
import './config.js';

function App() {
  const isLogin = sessionStorage.getItem("login");
  if(isLogin == null) window.location = "/login"

  const connection = global.config.conn.api.connection+'/Articulo';
  const [articulo, setArticulo] = React.useState([]);
  let articuloCarList = [];

  React.useEffect(() => {
    axios.get(connection).then((response) => {
      setArticulo(response.data);
      console.log(response.data)
    });
  }, []);

  function CarritoAdd(e, articulo) {
    e.preventDefault();
    const articuloLocal = JSON.parse(localStorage.getItem('carStored'));

    if (articuloLocal == null) {
      articuloCarList.push(articulo);
      localStorage.setItem('carStored', JSON.stringify(articuloCarList));
    } else {
      articuloLocal.push(articulo);
      localStorage.setItem('carStored', JSON.stringify(articuloLocal));
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div class="container mt-3">
        <div class="row">
          {articulo.length > 0 && articulo.map(a => (
            <div class="col-sm-4">
              <div class="card">
                <img src={`data:${a.extesionImagen};base64,${a.imagen}`} class="img" alt='no-image' />
                <div class="card-body text-center">
                  <h5 class="card-title">Articulo: {a.descripcion}</h5>
                  <p class="card-text">Precio: ${a.precio}</p>
                  <button class="btn btn-primary" type='button' onClick={e => CarritoAdd(e, a)}>Agregar al carrito</button>
                </div>
              </div>
            </div>
          ))}
          {articulo.length < 1 && 
          <div class="alert alert-primary" role="alert">
            Ningun articulo se ha agregado
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;