require('dotenv').config();//Librería para que se utilice las variables de entorno
const passport = require('passport');//Librería para utilizar autentificaión y seguridad de acceso
const express = require('express');//Librería para crear servidor
const compression = require('compression');//Librería para hacer más compacto el proyecto.
const cors = require('cors');//Librería para intearctuar con los request que lleguen al server

//Importo los diferentes módulos que componen el proyecto
const authJWT = require('./src/libs/auth');//JsonWebToken para poner seguridad al acceso de rutas 
const config = require('./src/config/enviroment'); //Configuración del entorno de desarrollo
const routeRol = require('./src/routers/rol.routes');//Rutas de roles
const routerUser = require('./src/routers/user.routes');//Rutas de usuarios

passport.use(authJWT);//Indico al passport que utilizará una seguridad de JWT

const app = express();//Defino un servidor
app.use(compression());//Comprimo el servidor
app.use(cors());//Acepto todas los request
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(express.urlencoded({ limit: '50mb', extended: true }));//Las peticiones de request serán urlencoded
app.use(express.json({ limit: '50mb', extended: true })); //Aceptarán datos en formato JSON
app.use(passport.initialize());//Anexo passport al server

// Rutas
app.use('/rol', routeRol);//Anexo las rutas de rol
app.use('/user', routerUser);//Anexo las rutas del user

// Pongo en ejecución en el server
app.listen(config.PORT, config.HOST, () => {
  console.log(`Server Agrotec ejecutandose en \x1b[36mhttp://${config.HOST}:${config.PORT}\x1b[0m`);
});