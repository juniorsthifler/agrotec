import React from 'react';
import Main from '../Componentes/Main';
import { Link } from 'react-router-dom';
//
export default function RecursoNoExiste({ mensaje }) {
    return (
        <Main center={true}>
            <div>
                <h2 className="RecursoNoExiste__mensaje">{mensaje}</h2>
                <p className="RecursoNoExiste__link-container">Ir al <Link to="/">Home</Link></p>
            </div>
        </Main>
    );
}