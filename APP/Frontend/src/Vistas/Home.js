import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Componentes/Loading';
import Post from '../Componentes/Post';
import Axios from 'axios';
import Main from '../Componentes/Main';


async function cargarPost(fechaDelUltimoPost) {
    const query = fechaDelUltimoPost ? `?fecha=${fechaDelUltimoPost}` : '';
    const { data: nuevosPosts } = await Axios.get(`/api/posts/feed${query}`);
    return nuevosPosts;
}

const NUMERO_POST_POR_LLAMADA = 3;

export default function Home({ mostrarError, usuario }) {
    const [posts, setPosts] = useState([]);
    const [cargandoPostIniciales, setCargandoPostIniciales] = useState(true);
    const [cargandoMasPost, setCargandoMasPost] = useState(false);
    const [todosLosPostscargados, setTodosLosPostscargados] = useState(false);

    useEffect(() => {
        async function cargarPostiniciales() {
            try {
                setCargandoPostIniciales(false);
                /*const nuevosPosts = await cargarPost();
                setPosts(nuevosPosts);
                setCargandoPostIniciales(false);
                revisarSiHayMasPosts(nuevosPosts);*/
            } catch (error) {
                //mostrarError('Hubo algun problema al cargar los Posts');
            }
        }
        cargarPostiniciales();
    }, [])

    async function cargarMasPost() {
        if (cargandoMasPost) {
            return;
        }

        try {
            setCargandoMasPost(true);
            const fechaultimoPost = posts[posts.length - 1].fecha_creado;
            const nuevosPost = await cargarPost(fechaultimoPost);
            setPosts(viejosPosts => [...viejosPosts, ...nuevosPost]);
            setCargandoMasPost(false);
            revisarSiHayMasPosts(nuevosPost);
        } catch (error) {
            mostrarError('Existió un problema al cargar más posts.');
            setCargandoMasPost(false);
        }
    }


    function revisarSiHayMasPosts(nuevosPosts) {
        if (nuevosPosts.length < NUMERO_POST_POR_LLAMADA) {
            setTodosLosPostscargados(true);
        }
    }


    if (cargandoPostIniciales) {
        return (
            <Main center={true}>
                <Loading />
            </Main>
        );
    }

    if (!cargandoPostIniciales && posts.length === 0) {
        return (
            <Main center={true}>
                <div className="NoSiguesANadie">
                    <p className="NoSiguesANadie__mensaje">Actualmente no existe ningún Post, Puede acceder a su cuenta y agregar Posts</p>
                    <div className="text-center">
                        <Link to="/login" className="NoSiguesANadie__boton">Acceder a mi cuenta</Link>
                    </div>
                </div>
            </Main>
        );
    }

    return (
        <Main center={true}>
            <div className="Feed">
                {posts.map(post => (<Post key={post._id} post={post} mostrarError={mostrarError} usuario={usuario} />))}
                <CargarMasposts onClick={cargarMasPost} todosLosPostscargados={todosLosPostscargados} />
            </div>
        </Main>
    );
}


function CargarMasposts({ onClick, todosLosPostscargados }) {
    if (todosLosPostscargados) {
        return <div className="Feed__no-hay-mas-posts">No hay más posts</div>
    }

    return (
        <button className="Feed__cargar-mas" onClick={onClick}>Ver más</button>
    );
}