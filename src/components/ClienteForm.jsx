import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function ClienteForm()
{
    const connection = global.config.conn.api.connection+'/Cliente';
    const connectionCliente = global.config.conn.api.connection+'/ClienteArticulo';
    let pass = "";
    const { id } = useParams();
    const [cliente,setCliente] = React.useState(null);
    const [clienteArt,setClienteArt] = React.useState([]);
    let navigate = useNavigate();
    
    React.useEffect(() => {
        if(id)
        {
            axios.get(connection+'/GetById?id='+id).then((response) => {
            setCliente(response.data);
        });
        }
        axios.get(connectionCliente).then((response) => {
            setClienteArt(response.data)
        })
      }, []);

    let clienteF = {
        id: 0,
        nombre: "",
        apellidos: "",
        direccion: "",
    }

    if(cliente) clienteF = cliente;

    const Save = async(event) => 
    {
        console.log(connection)
        event.preventDefault();
        if(!id)
        {
            clienteF.pass = pass;
            await axios.post(connection, clienteF)
                .then( () => {
                    navigate("/cliente");
                    SweetAlert('Saved successfully','success');
                }).catch( () => SweetAlert('Error','error'));
        }
        else
            await axios.put(connection, clienteF)
                .then( () => {
                    navigate("/cliente");
                    SweetAlert('Updated successfully','success');
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

    return(
        <>
            <div class="container mt-5" onSubmit={Save}>
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input defaultValue={clienteF.nombre} type="text" class="form-control" id="nombre" required
                        onChange={e => clienteF.nombre = e.target.value}/>
                    </div>
                    <div class="col-md-6">
                        <label for="apellidos" class="form-label">Apellidos</label>
                        <input defaultValue={clienteF.apellidos} type="text" class="form-control" id="apellidos" required
                        onChange={e => clienteF.apellidos = e.target.value}/>
                    </div>
                    <div class="col-12">
                        <label for="direccion" class="form-label">Direccion</label>
                        <textarea defaultValue={clienteF.direccion} type="text" class="form-control" id="direccion"
                        onChange={e => clienteF.direccion = e.target.value}/>
                    </div>
                    {!id && 
                        <div class="col-md-6">
                        <label for="pass" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="pass" required
                        onChange={e => pass = e.target.value}/>
                    </div>
                    }
                    
                    <div class="col-12">
                        { !id ? <button type="submit" class="btn btn-primary">Save</button>
                        : <button type="submit" class="btn btn-warning">Update</button> }
                        <Link to={'/'}>
                            <button class="btn btn-dark ms-2">Home</button>
                        </Link>
                    </div>
                </form>

            </div>
        </>
    );
}

export default ClienteForm;