import React from 'react';
import { Link } from 'react-router-dom';
import stringToColor from 'string-to-color';

export default function Avatar({ usuario }) {
    return (
        <div className="Avatar">
            <Imageavatar usuario={usuario} />
            <Link to={`/perfil/${usuario.username}`}>
                <h2>{usuario.username} </h2>
            </Link>
        </div>
    );
}
//
export function Imageavatar({ usuario }) {
    const Style = {
        backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
        backgroundColor: stringToColor(usuario.username)
    };

    return <div className="Avatar__img" style={Style}></div>;
}