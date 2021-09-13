import React, { useState } from 'react';
import Main from '../Componentes/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Loading from '../Componentes/Loading';
import Axios from 'axios';

export default function Upload({ history, mostrarError }) {
    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [enviandoPost, setEnviandoPost] = useState(false);
    const [caption, setCaption] = useState('');

    async function handeImagenSeleccionada(evento) {
        try {
            setSubiendoImagen(true);
            const file = evento.target.files[0];
            const config = {
                headers: {
                    'Content-Type': file.type
                }
            }
            const { data } = await Axios.post('/api/posts/upload', file, config);
            setImagenUrl(data.url);
            setSubiendoImagen(false);
        } catch (error) {
            mostrarError("error.response.data");
            setSubiendoImagen(false);
        }
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        if (enviandoPost) {
            return;
        }
        if (subiendoImagen) {
            mostrarError('No se a terminado de subir la imagen');
            return;
        }
        if (!imagenUrl) {
            mostrarError('Primero seleciona una imagen');
            return;
        }
        try {
            setEnviandoPost(true);
            const body = {
                caption,
                url: imagenUrl
            };
            await Axios.post('/api/posts', body);
            setEnviandoPost(false);
            history.push('/');
        } catch (error) {
            console.log(error);
            mostrarError(error.response.data);
        }
    }


    return (
        <Main center={true}>
            <div className="Upload">
                <form onSubmit={handleSubmit}>
                    <div className="Upload__image-section"><SeccionSubirImagen subiendoImagen={subiendoImagen} imagenUrl={imagenUrl} handeImagenSeleccionada={handeImagenSeleccionada} /> </div>
                    <textarea className="Upload__caption" name="caption" required maxLength="180" placeholder="Caption de tú post" value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <button className="Upload__submit" type="submit">Post</button>
                </form>
            </div>
        </Main>
    );
}

function SeccionSubirImagen({ subiendoImagen, imagenUrl, handeImagenSeleccionada }) {
    if (subiendoImagen) {
        return <Loading />;
    } else if (imagenUrl) {
        return <img src={imagenUrl} alt="" />;
    } else {
        return (
            <label className="Upload__image-label">
                <FontAwesomeIcon icon={faUpload} />
                <span>Publica una imagen</span>
                <input type="file" className="hidden" name="imagen" onChange={handeImagenSeleccionada} />
            </label>
        );
    }
}