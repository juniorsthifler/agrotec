import React, { useState, useEffect } from 'react';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Grid from '../Componentes/Grid';
import stringToColor from 'string-to-color';
import Axios from 'axios';
import useEsMovil from '../Hooks/useEsMovil';


export default function Perfil({ mostrarError, usuario, match, logout }) {
    const esMobil = useEsMovil();
    const username = match.params.username;
    const [usuarioDuenioPerfil, setUsuarioDuenioPerfil] = useState(null);
    const [posts, setPosts] = useState([]);
    const [cargandoPerfil, setCargandoPerfil] = useState(true);
    const [subiendoImagen, setSubiendoImagen] = useState(false);


    useEffect(() => {
        async function cargarPostYUsuario() {
            try {
                setCargandoPerfil(true);
                const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
                const { data: posts } = await Axios.get(`/api/posts/usuario/${usuario._id}`);
                setUsuarioDuenioPerfil(usuario);
                setPosts(posts);
                setCargandoPerfil(false);
            } catch (error) {
                mostrarError("Existio un problema al cargar el perfil.");
                setCargandoPerfil(false);
            }
        }
        cargarPostYUsuario();
    }, [])


    function perfilUserLogueado() {
        return usuario._id === usuarioDuenioPerfil._id;
    }


    async function handleImagenSeleccionada(event) {
        try {
            setSubiendoImagen(true);
            const file = event.target.files[0];
            const config = {
                headers: {
                    'Content-Type': file.type
                }
            }
            const { data } = await Axios.post('/api/usuarios/upload', file, config);
            setUsuarioDuenioPerfil({ ...usuarioDuenioPerfil, imagen: data.url });
            setSubiendoImagen(false);
        } catch (error) {
            mostrarError(error.response.data);
            setSubiendoImagen(false);
        }
    }

    if (cargandoPerfil) {
        return (
            <Main center={true}>
                <Loading />
            </Main>
        );
    }

    if (usuario == null) {
        return null;
    }

    return (
        <Main center={true}>
            <h2 style={{ textAlign: "center", marginBottom: "2em" }}>Mi Perfil</h2>
            <div className="Perfil">
                <Imagenavatar perfilUserLogueado={perfilUserLogueado} usuarioDuenioPerfil={usuarioDuenioPerfil} handleImagenSeleccionada={handleImagenSeleccionada} subiendoImagen={subiendoImagen} />
                <div className="Perfil__bio-container">
                    <div className="Perfil__bio-heading">
                        <h2 className="Capitalize">{usuarioDuenioPerfil.username}</h2>
                        {perfilUserLogueado() && <BotonLogout logout={logout} />}
                    </div>
                    {!esMobil && <DescripcionPerfil usuarioDuenioPerfil={usuarioDuenioPerfil} />}
                </div>
            </div>
            {esMobil && <DescripcionPerfil usuarioDuenioPerfil={usuarioDuenioPerfil} />}
            <div className="Perfil__separador" />
            {posts.length > 0 ? <Grid posts={posts} /> : <NoHaPosteadoFotos />}
        </Main>
    );
}


function DescripcionPerfil({ usuarioDuenioPerfil }) {
    return (
        <div className="Perfil__descripcion">
            <h2 className="Perfil__nombre">{usuarioDuenioPerfil.nombre} </h2>
        </div>
    );
}

function Imagenavatar({ perfilUserLogueado, usuarioDuenioPerfil, handleImagenSeleccionada, subiendoImagen }) {
    let contenido;
    if (subiendoImagen) {
        contenido = <Loading />
    } else if (perfilUserLogueado) {
        contenido = (
            <label className="Perfil__img-placeholder Perfil__img-placeholder--pointer" style={{ backgroundImage: usuarioDuenioPerfil.imagen ? `url(${usuarioDuenioPerfil.imagen})` : null, backgroundColor: stringToColor(usuarioDuenioPerfil.username) }}>
                <input type="file" onChange={handleImagenSeleccionada} className="hidden" name="imagen" />
            </label>
        );
    } else {
        contenido = (
            <div className="Perfil__img-placeholder" style={{ backgroundImage: usuarioDuenioPerfil.imagen ? `url(${usuarioDuenioPerfil.imagen})` : null, backgroundColor: stringToColor(usuarioDuenioPerfil.username) }} />
        );
    }

    return (
        <div className="Perfil__img-container">{contenido} </div>
    );
}

function BotonLogout({ logout }) {
    return (
        <button onClick={logout} className="Perfil__boton-logout">Logout</button>
    );
}


function NoHaPosteadoFotos() {
    return <p className="text-center">No tiene ningún Post</p>
}