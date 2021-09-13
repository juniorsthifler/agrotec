import React, { useState, useEffect } from 'react';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Avatar from '../Componentes/Avatar';
import RecursoNoExiste from '../Componentes/RecursoNoExiste';
import Axios from 'axios';
export default function PostVista({ mostrarError, match, usuario }) {
    const postId = match.params.id;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postNoExiste, setPostNoExiste] = useState(false);

    useEffect(() => {
        async function cargarPost() {
            try {
                const { data: auxpost } = await Axios.get(`/api/posts/${postId}`);
                setPost(auxpost);
                setLoading(false);
            } catch (error) {
                if (error.response && (error.response.status === 404 || error.response.status === 400)) {
                    setPostNoExiste(true);
                } else {
                    mostrarError('Existió un problema al cargar este post.');
                }
                setLoading(false);
            }
        }
        cargarPost();
    }, [postId]);

    if (loading) {
        return (
            <Main center={true}>
                <Loading />
            </Main>
        );
    }

    if (postNoExiste) {
        return <RecursoNoExiste mensaje="El post que estas intentando ver no existe" />
    }

    if (post == null) {
        return null;
    }

    return (
        <Main center={true}>
            <Post {...post} />
        </Main>
    );
}


function Post({ caption, url, usuario }) {
    return (
        <div className="Post">
            <div className="Post__image-container">
                <img src={url} alt={caption}></img>
            </div>
            <div className="Post__side-bar">
                <Avatar usuario={usuario} />
                <div className="Post__comentarios-y-like">
                    <Comentarios caption={caption} />
                </div>
            </div>
        </div>
    );
}

function Comentarios({ caption }) {
    return (
        <ul className="Post__comentarios">
            <li className="Post__comentario">
                {caption}
            </li>
        </ul>
    );
}