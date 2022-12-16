import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../config.js';

function ArticuloForm()
{
    const connectionTienda = global.config.conn.api.connection+'/Tienda';
  const [tienda, setTienda] = React.useState([]);
    const connection = global.config.conn.api.connection+'/Articulo';
    const { id } = useParams();
    const [articulo,setArticulo] = React.useState(null);
    let navigate = useNavigate();

    const isLogin = sessionStorage.getItem("login");
    if(isLogin == null) window.location = "/login"
    
    React.useEffect(() => {
        if(id)
        {
            axios.get(connection+'/GetById?id='+id).then((response) => {
            setArticulo(response.data);
        });
        }
        axios.get(connectionTienda).then((response) => {
            setTienda(response.data);
            console.log(response.data)
          });
      }, []);

    let articuloF = {
        codigo: 0,
        descripcion: "",
        extesionImagen: "",
        imagen: null,
        precio: 0,
        stock:0
    }

    if(articulo) articuloF = articulo;

    const fileInput = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            articuloF.imagen = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            console.log(articuloF.imagen);
            articuloF.extesionImagen = reader.result.substring
                (reader.result.indexOf(":") + 1,reader.result.indexOf(";"));
            console.log(articuloF.extension);
        };
        reader.readAsDataURL(file);
    };

    const Save = async(event) => 
    {
        console.log(connection)
        event.preventDefault();
        if(!id)
            await axios.post(connection, articuloF)
                .then( () => {
                    navigate("/Articulo");
                    SweetAlert('Saved successfully','success');
                }).catch( () => SweetAlert('Error','error'));
        else
            await axios.put(connection, articuloF)
                .then( () => {
                    navigate("/Articulo");
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
                        <label for="descripcion" class="form-label">Descripcion</label>
                        <input defaultValue={articuloF.descripcion} type="text" class="form-control" id="descripcion" required
                        onChange={e => articuloF.descripcion = e.target.value}/>
                    </div>
                    <div class="col-md-6">
                        <label for="precio" class="form-label">Precio</label>
                        <input defaultValue={parseInt(articuloF.precio)} type="number" class="form-control" id="precio" required
                        onChange={e => articuloF.precio = parseInt(e.target.value)}/>
                    </div>
                    <div class="col-md-6">
                        <label for="stock" class="form-label">Stock</label>
                        <input defaultValue={parseInt(articuloF.stock)} type="number" class="form-control" id="stock" required
                        onChange={e => articuloF.stock = parseInt(e.target.value)}/>
                    </div>

                    <div class="col-12 row">
                        <div class="col-md-6">
                            <label name="imagen" class="form-label">Imagen:</label>
                            <input type="file" accept="image/*" id="imagen" class="form-control"
                            onChange={(e) => fileInput(e.target.files[0])} />
                        </div>
                        <div class="col-md-6">
                            {articuloF.imagen && articuloF.extension ?
                                <img src={`data:${articulo.extension};base64,${articulo.imagen}`} class="imagen d-flex pt-2 "/>
                                :
                                <img></img>
                            }
                        </div> 
                    </div>
                    
                    <div class="col-12">
                        { !id ? <button type="submit" class="btn btn-primary">Save</button>
                        : <button type="submit" class="btn btn-warning">Update</button> }
                        <Link to={'/Articulo'}>
                            <button class="btn btn-dark ms-2">Home</button>
                        </Link>
                    </div>
                </form>

                
            </div>
        </>
    );
}

export default ArticuloForm;