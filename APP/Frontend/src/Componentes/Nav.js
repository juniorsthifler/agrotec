import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faUserCircle, faCreditCard, faObjectGroup, faMoneyBillAlt, faShareSquare } from '@fortawesome/free-regular-svg-icons';

export default function Nav({ usuario, rolActual }) {
    return (
        <nav className="Nav">
            <ul className="Nav__links">
                <li>
                    <Link className="Nav__link" to="/">AGROTEC</Link>
                </li>
                {usuario ? <LoginRoutes usuario={usuario} rolActual={rolActual} /> : <LogoutRoutes />}
            </ul>
        </nav>
    );
}


function LoginRoutes({ usuario, rolActual }) {
    return (
        rolActual !== null ?
            <>
                {(rolActual == "Administrador") ?
                    <LoginRoutesAdmin />
                    :
                    (rolActual == "Productor") ?
                        <LoginRoutesProductor />
                        :
                        <LoginRoutesComercinte />}
                <li className="Nav__link-margin-left">
                    <Link className="Nav__link" to={`/perfil/${usuario.username}`} title="Perfil">
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    </Link>
                </li>
            </>
            :
            null
    );
}


function LoginRoutesAdmin() {
    return (
        <>
            <li className="Nav__link-push">
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/adminusuarios" title="Administrar Usuarios">
                    <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                </Link>
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/adminventas" title="Administrar Productos">
                    <FontAwesomeIcon icon={faObjectGroup}></FontAwesomeIcon>
                </Link>
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/admincartera" title="Cartera App">
                    <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
                </Link>
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/adminestadisticas" title="Estadisticas">
                    <FontAwesomeIcon icon={faChartBar}></FontAwesomeIcon>
                </Link>
            </li>
        </>
    );
}

function LoginRoutesProductor() {
    return (
        <>
            <li className="Nav__link-push">
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/productos" title="Mis productos">
                    <FontAwesomeIcon icon={faObjectGroup}></FontAwesomeIcon>
                </Link>
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/ventas" title="Mis ventas">
                    <FontAwesomeIcon icon={faMoneyBillAlt}></FontAwesomeIcon>
                </Link>
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/upload" title="Ofertar un producto">
                    <FontAwesomeIcon icon={faShareSquare}></FontAwesomeIcon>
                </Link>
            </li>
        </>
    );
}

function LoginRoutesComercinte() {
    return (
        <>
            <li className="Nav__link-push">
                <Link className="Nav__link" style={{ marginLeft: "0.5em" }} to="/compras" title="Mis Compras">
                    <FontAwesomeIcon icon={faObjectGroup}></FontAwesomeIcon>
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