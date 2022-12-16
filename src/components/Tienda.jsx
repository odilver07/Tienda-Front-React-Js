// import './App.css';
import axios from 'axios';
import React from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import Navbar from './NavBar';
// import './config.js';

function Tienda() {
  const connection = global.config.conn.api.connection+'/Tienda';
  const [tienda, setTienda] = React.useState([]);

  const isLogin = sessionStorage.getItem("login");
  if(isLogin == null) window.location = "/login"
  
  React.useEffect(() => {
    axios.get(connection).then((response) => {
      setTienda(response.data);
      console.log(response.data)
    });
  }, []);

  function Delete(id)
  {
    axios.delete(connection+'?id='+id)
    .then( () => 
    {
      axios.get(connection).then((response) => {
      setTienda(response.data);
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
      <Link to={'/add/tienda'}>
        <button type='button' class="btn btn-primary mt-5">Add</button>
      </Link>
      <table class="table mt-2">
        <thead class="table-dark">
          <tr>
            <th>Id</th>
            <th>Sucursal</th>
            <th>Direccion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tienda != null && tienda.map((t) => (
            <>
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.sucursal}</td>
                <td>{t.direccion}</td>
                <td>
                  <button class='btn btn-danger' onClick={() => Delete(t.id)}>Delete</button>
                  <Link to={'/edit/tienda/'+t.id}>
                    <button class="btn btn-warning ms-2">Edit</button>
                  </Link>
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

export default Tienda;