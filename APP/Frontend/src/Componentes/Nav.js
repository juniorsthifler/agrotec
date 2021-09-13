import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function Nav({ usuario }) {
    return (
        <nav className="Nav">
            <ul className="Nav__links">
                <li>
                    <Link className="Nav__link" to="/">AGROTEC</Link>
                </li>
                {usuario ? <LoginRoutes usuario={usuario} /> : <LogoutRoutes />}
            </ul>
        </nav>
    );
}


function LoginRoutes({ usuario }) {
    return (
        <>
            <li className="Nav__link-push">
                <Link className="Nav__link" to="/upload" title="Publicar un post">
                    <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
                </Link>
            </li>
            <li className="Nav__link-margin-left">
                <Link className="Nav__link" to={`/perfil/${usuario.username}`} title="Perfil">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </Link>
            </li>
        </>
    );
}


function LogoutRoutes() {
    return (
        <>
            <li className="Nav__link-push">
                <Link className="Nav__link" to={`/register`} title="Acceder">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </Link>
            </li>
        </>
    );
}