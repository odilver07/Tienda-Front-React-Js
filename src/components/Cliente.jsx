// import './App.css';
import axios from 'axios';
import React from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import Navbar from './NavBar';
// import './config.js';

function Cliente() {
  const connection = global.config.conn.api.connection+'/Cliente';
  const [cliente, setCliente] = React.useState([]);

  const isLogin = sessionStorage.getItem("login");
  if(isLogin == null) window.location = "/login"
  
  React.useEffect(() => {
    axios.get(connection).then((response) => {
      setCliente(response.data);
      console.log(response.data)
    });
  }, []);

  function Delete(id)
  {
    axios.delete(connection+'?id='+id)
    .then( () => 
    {
      axios.get(connection).then((response) => {
      setCliente(response.data);
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
      <Link to={'/add/cliente'}>
        <button type='button' class="btn btn-primary mt-5">Add</button>
      </Link>
      <table class="table mt-2">
        <thead class="table-dark">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Direccion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cliente != null && cliente.map((c) => (
            <>
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.apellidos}</td>
                <td>{c.direccion}</td>
                <td>
                  <button class='btn btn-danger' onClick={() => Delete(c.id)}>Delete</button>
                  <Link to={'/edit/'+c.id}>
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

export default Cliente;