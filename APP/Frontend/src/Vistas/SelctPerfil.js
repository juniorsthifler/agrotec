import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';

export default function Feed({ mostrarError, usuario, Loading, logout }) {
    const [estadoLoading, setEstadoLoading] = useState(true);
    const [botonesRol, setBotonesRol] = useState(null);

    useEffect(() => {
        try {
            const listItems = usuario.map((us) => <div className="text-center"><Link to="#" className="NoSiguesANadie__boton">{us.rol}</Link></div>);
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
                {(botonesRol !== null) ? botonesRol : <BotonLogout logout={logout} />}
            </div>
            <BotonLogout logout={logout} />
        </Main>
    );
}

function BotonLogout({ logout }) {
    return (
        <button onClick={logout} className="Perfil__boton-logout">Logout</button>
    );
}