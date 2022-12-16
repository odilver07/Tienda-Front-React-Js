import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Login()
{
    const connection = global.config.conn.api.connection+"/login"
    const navigate = useNavigate();

    let isLogin = sessionStorage.getItem("login");

    if(isLogin != null)
    {
        console.log("sesion activa")
        window.location = "/cliente";
    } 

    let user = {
        "user" : "",
        "pass" : ""
    }

    const Login = async() =>
    {
        if(user.user.length > 0 && user.pass.length > 0)
        {
            await axios.post(connection, user)
                .then( (response) => {
                    sessionStorage.setItem("login",JSON.stringify(response.data));
                    navigate("/cliente", {replace: true})
                })
                // .catch( () => SweetAlert('Error','error'));
        }
    }

    function registrarse(event)
    {
        event.preventDefault();
        navigate("/add/cliente", {replace: true})
    }

    // function SweetAlert(mess,icon)
    // {
    //     Swal.fire({
    //         position: 'center',
    //         icon: icon,
    //         title: mess,
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    // }

    return(
        <>
            <div class="container mt-5">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="user" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="user" required
                        onChange={e => user.user = e.target.value}/>
                    </div>
                    <div class="col-md-6">
                        <label for="pass" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="pass" required
                        onChange={e => user.pass = e.target.value}/>
                    </div>
                    
                    <button type="button" class="btn btn-primary" onClick={Login}>Login</button>
                </form>
                <a href="#" onClick={e => registrarse(e)}>Registrarse</a>
            </div>
        </>
    );
}

export default Login;