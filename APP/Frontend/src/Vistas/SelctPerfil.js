import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';

export default function Feed({ mostrarError, usuario, Loading, logout, setRolActual }) {
    const [estadoLoading, setEstadoLoading] = useState(true);
    const [botonesRol, setBotonesRol] = useState(null);

    const clickSelectRol = (rol) => (event) => {
        setRolActual(rol);
    }

    useEffect(() => {
        try {
            const listItems = usuario.map((us) => <div className="text-center"><BotonPerfil usuario={us} clickSelectRol={clickSelectRol} /></div>);
            setBotonesRol(listItems);
            setEstadoLoading(false);
        } catch (error) {
            mostrarError("Sucedió un error al cargar los roles del usuario")
            setEstadoLoading(false);
        }
    }, []);

    if (estadoLoading) {
        return (
            <Main center={true}>
                <Loading />
            </Main>
        );
    }

    return (
        <Main center={true}>
            <div className="NoSiguesANadie">
                <p className="NoSiguesANadie__mensaje">{(botonesRol !== null) ? "Seleccione el perpil al que desea ingresaar" : "No se encontró ningún rol asociado a este usuario"}</p>
                {(botonesRol !== null) ? botonesRol : null}
                <div className="text-center"><BotonLogout logout={logout} /></div>
            </div>
        </Main>
    );
}

function BotonLogout({ logout }) {
    return (
        <button onClick={logout} className="NoSiguesANadie__boton" style={{ backgroundColor: "red" }}>Cerrar sesión</button>
    );
}


function BotonPerfil({ usuario, clickSelectRol }) {
    return (
        <button onClick={clickSelectRol(usuario.rol)} className="NoSiguesANadie__boton">{usuario.rol}</button>
    );
}