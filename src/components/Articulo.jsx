// import './App.css';
import axios from 'axios';
import React from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import Navbar from './NavBar';
import '../config.js';

function Articulo() {
  const connection = global.config.conn.api.connection+'/Articulo';
  const [articulo, setArticulo] = React.useState([]);

  const isLogin = sessionStorage.getItem("login");
  if(isLogin == null) window.location = "/login"
  
  React.useEffect(() => {
    axios.get(connection).then((response) => {
      setArticulo(response.data);
       console.log(response.data)
    });
  }, []);

  function Delete(id)
  {
    axios.delete(connection+'?id='+id)
    .then( () => 
    {
      axios.get(connection).then((response) => {
      setArticulo(response.data);
      let articuloLocal = JSON.parse(localStorage.getItem('carStored'));
      let articulosF = [];
      articuloLocal.forEach(art => {
        console.log(art.codigo)
        if(art.codigo != id)
        {
          articulosF.push(art);
        }
      })
      localStorage.setItem('carStored',JSON.stringify(articulosF));
      });
      SweetAlert('Saved successfully','success');
    })
    .catch( () => SweetAlert('Error','error'));
  }

  function SweetAlert(mess,icon)
  {
      Swal.fire({
          position: 'center',
          icon: icon,
          title: mess,
          showConfirmButton: false,
          timer: 1500
        });
  }

  return (
    <>
    <Navbar></Navbar>
      <div class='container'>
      <Link to={'/add/articulo'}>
        <button type='button' class="btn btn-primary mt-5">Add</button>
      </Link>
      <table class="table mt-2">
        <thead class="table-dark">
          <tr>
            <th>Codigo</th>
            <th>descripcion</th>
            <th>Precio</th>
            <th>stock</th>
            <th></th><th></th><th></th>
          </tr>
        </thead>
        <tbody>
          {articulo != null && articulo.map((a) => (
            <>
              <tr key={a.id}>
                <td>{a.codigo}</td>
                <td>{a.descripcion}</td>
                <td>{a.precio}</td>
                <td>{a.stock}</td>
                <td>
                  <button class='btn btn-danger' onClick={() => Delete(a.codigo)}>Delete</button>
                </td>
                <td>
                  <Link to={'/edit/articulo/'+a.codigo}>
                    <button class="btn btn-warning ms-2">Edit</button>
                  </Link>
                </td>
                <td>
                  <img src={`data:${a.extesionImagen};base64,${a.imagen}`} class="img" alt='no-image'/>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default Articulo;
