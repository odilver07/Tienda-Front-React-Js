import {Link, useNavigate} from "react-router-dom";
import React from 'react';

function Navbar(props){
    const navigate = useNavigate();
    const articulos = [];

    function Navegar(e,direccion)
    {
        e.preventDefault();
        navigate(direccion, {replace: true});
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" onClick={(e) => Navegar(e,'/')}>Tienda</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" onClick={(e) => Navegar(e,'/cliente')}>Cliente</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" onClick={(e) => Navegar(e,'/tienda')}>Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" onClick={(e) => Navegar(e,'/articulo')}>Articulo</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" onClick={(e) => Navegar(e,'/carrito')}>Carrito</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;