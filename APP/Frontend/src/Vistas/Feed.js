import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';

export default function Feed({ mostrarError, usuario, rolActual }) {
    return (
        <Main center={true}>
            <div className="NoSiguesANadie">
                <p className="NoSiguesANadie__mensaje">Bienvenido al blog, Usted puede publicar POST y ver su perfil</p>
                <div className="text-center">
                    <Link to="/upload" className="NoSiguesANadie__boton">Publicar un POST para el ROL {rolActual} </Link>
                </div>
            </div>
        </Main>
    );


}