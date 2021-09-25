import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';
import imagenSignup from "../imagenes/signup.png";
export default function Signup({ signup, mostrarError }) {

    const [usuario, setUsuario] = useState({ dni: '', full_name: '', date_birth: '', celular: '', email: '', user: '', password: '', direction: '', id_rol: '2' });

    function handleInputChange(e) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signup(usuario);
        } catch (error) {
            mostrarError("El usuario ya existe. Modifique uno de los sigientes campos: cédula/Ruc o Email o Celular o user; e intente de nuevo");
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
                        <select name="id_rol" className="Form__field" onChange={handleInputChange} value={usuario.id_rol}>
                            <option value="-1" disabled>Seleccione un tipo de usuario</option>
                            <option value="2">Productor</option>
                            <option value="3">Comerciante</option>
                        </select>
                        <input type="number" name="dni" placeholder="Cédula / Ruc" className="Form__field" required minLength="10" maxLength="20" onChange={handleInputChange} value={usuario.dni} />
                        <input type="text" name="full_name" placeholder="Nombre y apellido" className="Form__field" required minLength="3" maxLength="100" onChange={handleInputChange} value={usuario.full_name} />
                        <input type="date" name="date_birth" placeholder="Fecha de nacimiento" className="Form__field" required minLength="7" maxLength="50" onChange={handleInputChange} value={usuario.date_birth} />
                        <input type="number" name="celular" placeholder="Celular" className="Form__field" required minLength="10" maxLength="15" onChange={handleInputChange} value={usuario.celular} />
                        <input type="email" name="email" placeholder="Email" className="Form__field" required onChange={handleInputChange} value={usuario.email} />
                        <input type="text" name="user" placeholder="Username" className="Form__field" required minLength="3" maxLength="30" onChange={handleInputChange} value={usuario.user} />
                        <input type="password" name="password" placeholder="Contraseña" className="Form__field" required minLength="6" maxLength="30" onChange={handleInputChange} value={usuario.password} />
                        <input type="text" name="direction" placeholder="Dirección" className="Form__field" required minLength="3" maxLength="500" onChange={handleInputChange} value={usuario.direction} />
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