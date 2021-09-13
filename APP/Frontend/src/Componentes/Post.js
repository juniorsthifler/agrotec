import React from 'react';
import Avatar from './Avatar';

export default function Post({ post }) {
    const {
        caption,
        url,
        usuario: usuarioDelPost
    } = post;

    return (
        <div className="Post-Componente">
            <Avatar usuario={usuarioDelPost} />
            <img src={url} alt={caption} className="Post-Componente__img" />
            <div className="Post-Componente__acciones">
                <ul>
                    <li>
                        <p><b>{usuarioDelPost.username} </b></p>{' '}
                        {caption}
                    </li>
                </ul>
            </div>
        </div>
    );
}