import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { setToken, deleteToken, getToken, initAxiosInterceptor } from './Helpers/auth-helpers';
import Nav from './Componentes/Nav';
import Loading from './Componentes/Loading';
import Error from './Componentes/Error';
import Home from './Vistas/Home';
import Signup from './Vistas/Signup';
import Login from './Vistas/login';
import Perfil from './Vistas/Perfil';
import Upload from './Vistas/Upload';
import Main from './Componentes/Main';
import Feed from './Vistas/Feed';
import Post from './Vistas/Post';

initAxiosInterceptor();
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);


  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function esconderError() {
    setError(null);
  }


  async function login(email, password) {
    const { data } = await Axios.post('/api/usuarios/login', { email, password });
    setUsuario(data.usuario);
    setToken(data.token);
  }

  async function signup(usuario) {
    const { data } = await Axios.post('/api/usuarios/signup', usuario);
    setUsuario(data.usuario);
    setToken(data.token);
  }

  function logout() {
    setUsuario(null);
    deleteToken();
  }

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }
      try {
        const { data: usuario } = await Axios.get('/api/usuarios/me');
        setUsuario(usuario);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario();
  }, []);

  if (cargandoUsuario) {
    return (
      <Main center={true}>
        <Loading />
      </Main>
    );
  }

  return (
    <Router>
      <Nav usuario={usuario} />
      <Error mensaje={error} esconderError={esconderError} />
      {usuario ? <LoginRoutes mostrarError={mostrarError} usuario={usuario} logout={logout} /> : <LogoutRoutes login={login} signup={signup} mostrarError={mostrarError} />}
    </Router>
  );
}

function LoginRoutes({ mostrarError, usuario, logout }) {
  return (
    <Switch>
      <Route path="/upload/" render={(props) => <Upload {...props} mostrarError={mostrarError} />} />
      <Route path="/post/:id" render={(props) => <Post {...props} mostrarError={mostrarError} usuario={usuario} />} />
      <Route path="/perfil/:username" render={(props) => <Perfil {...props} mostrarError={mostrarError} usuario={usuario} logout={logout} />} />
      <Route path="/" render={(props) => <Feed {...props} mostrarError={mostrarError} usuario={usuario} />} default />
    </Switch>
  );
}

function LogoutRoutes({ login, signup, mostrarError }) {
  return (
    <Switch>
      <Route path="/login/" render={(props) => <Login {...props} login={login} mostrarError={mostrarError} />} />
      <Route path="/register/" render={(props) => <Signup {...props} signup={signup} mostrarError={mostrarError} />} />
      <Route render={(props) => <Home {...props} mostrarError={mostrarError} />} default />
    </Switch>
  );
}