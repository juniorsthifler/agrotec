import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';
import imagenSignup from "../imagenes/signup.png";
export default function Signup({ signup, mostrarError }) {

    const [usuario, setUsuario] = useState({ email: '', username: '', password: '', nombre: '' });

    function handleInputChange(e) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signup(usuario);
        } catch (error) {
            mostrarError(error.response.data);
        }
    }

    return (
        <Main center={true}>
            <div className="Signup">
                <img src={imagenSignup} alt="" className="Signup__img" />
                <div className="FormContainer">
                    <h1 className="Form__titulo">Agrotec</h1>
                    <p className="FormContainer__info">Registrate y vende productos</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" className="Form__field" required onChange={handleInputChange} value={usuario.email} />
                        <input type="text" name="nombre" placeholder="Nombre y apellido" className="Form__field" required minLength="3" maxLength="100" onChange={handleInputChange} value={usuario.name} />
                        <input type="text" name="username" placeholder="Username" className="Form__field" required minLength="3" maxLength="30" onChange={handleInputChange} value={usuario.username} />
                        <input type="password" name="password" placeholder="Contraseña" className="Form__field" required minLength="6" maxLength="30" onChange={handleInputChange} value={usuario.password} />
                        <button className="Form__submit" type="submit">Sign Up</button>
                        <p className="FormContainer__info">
                            Ya tienes cuenta? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Main>
    );
}