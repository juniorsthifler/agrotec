require('dotenv').config();
const passport = require('passport');
const express = require('express');
const compression = require('compression');
const cors = require('cors');

const authJWT = require('./src/libs/auth');
const config = require('./src/config/enviroment');
const routeRol = require('./src/routers/rol.routes');
const routerUser = require('./src/routers/user.routes');

passport.use(authJWT);

const app = express();
app.use(compression());
app.use(cors());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(passport.initialize());

// Routers
app.use('/rol', routeRol);
app.use('/user', routerUser); routeRol

// Start server
app.listen(config.PORT, config.HOST, () => {
  console.log(`Server Agrotec ejecutandose en \x1b[36mhttp://${config.HOST}:${config.PORT}\x1b[0m`);
});