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
const routerCatalogoFinanciero = require('./src/routers/catalogo_financiero.routes');//Rutas del catalogo financiero
const routerHerramientasFinancieras = require('./src/routers/herramienta_financiera.routes');//Rutas de herramientas financieras
const routerOfertas = require('./src/routers/ofertas.routes');//Rutas de Ofertas
const routerProductos = require('./src/routers/producto.routes');//Rutas de Producto
const routerTransaccion = require('./src/routers/transaccion.routes');//Rutas de transaciones
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
app.use('/catalogo_financiero', routerCatalogoFinanciero);//Anexo las rutas del catalogo financiero 
app.use('/herramienta_financiera', routerHerramientasFinancieras);//Anexo las rutas de las herramientas financieras
app.use('/producto', routerProductos);//Anexo las rutas de productos
app.use('/oferta', routerOfertas);//Anexo las rutas de ofertas
app.use('/transaccion', routerTransaccion);//Anexo las rutas de transacciones

// Pongo en ejecución en el server
app.listen(config.PORT, config.HOST, () => {
  console.log(`Server Agrotec ejecutandose en \x1b[36mhttp://${config.HOST}:${config.PORT}\x1b[0m`);
});