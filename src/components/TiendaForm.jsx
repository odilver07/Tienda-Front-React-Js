import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function TiendaForm()
{
    const isLogin = sessionStorage.getItem("login");
    if(isLogin == null) window.location = "/login"

    const connection = global.config.conn.api.connection+'/Tienda';
    const { id } = useParams();
    const [tienda,setTienda] = React.useState(null);
    let navigate = useNavigate();
    
    React.useEffect(() => {
        if(id)
        {
            axios.get(connection+'/GetById?id='+id).then((response) => {
            setTienda(response.data);
        });
        }
      }, []);

    let tiendaF = {
        id: 0,
        sucursal: "",
        direccion: "",
    }

    if(tienda) tiendaF = tienda;

    const Save = async(event) => 
    {
        console.log(connection)
        event.preventDefault();
        if(!id)
            await axios.post(connection, tiendaF)
                .then( () => {
                    navigate("/tienda");
                    SweetAlert('Saved successfully','success');
                }).catch( () => SweetAlert('Error','error'));
        else
            await axios.put(connection, tiendaF)
                .then( () => {
                    navigate("/tienda");
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
                        <label for="sucursal" class="form-label">Nombre</label>
                        <input defaultValue={tiendaF.sucursal} type="text" class="form-control" id="sucursal" required
                        onChange={e => tiendaF.sucursal = e.target.value}/>
                    </div>
                    <div class="col-md-6">
                        <label for="direccion" class="form-label">Direccion</label>
                        <textarea defaultValue={tiendaF.direccion} type="text" class="form-control" id="direccion"
                        onChange={e => tiendaF.direccion = e.target.value}/>
                    </div>
                    
                    <div class="col-12">
                        { !id ? <button type="submit" class="btn btn-primary">Save</button>
                        : <button type="submit" class="btn btn-warning">Update</button> }
                        <Link to={'/tienda'}>
                            <button class="btn btn-dark ms-2">Home</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TiendaForm;