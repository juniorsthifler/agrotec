import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';
export default function Login({ login, mostrarError }) {
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });

    function handleInputChange(e) {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(credenciales.email, credenciales.password);
        } catch (error) {
            mostrarError(JSON.stringify(error.response.data.message));
        }
    }


    return (
        <Main center={true}>
            <div className="FormContainer">
                <h1 className="Form__titulo">Agrotec</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" className="Form__field" required onChange={handleInputChange} value={credenciales.email} />
                        <input type="password" name="password" placeholder="Contraseña" className="Form__field" required minLength="6" maxLength="30" onChange={handleInputChange} value={credenciales.password} />
                        <button className="Form__submit" type="submit">Login</button>
                        <p className="FormContainer__info">
                            No tienes cuenta? <Link to="/register">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Main>
    );
}