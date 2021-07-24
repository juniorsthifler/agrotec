const passportJWT = require('passport-jwt');

const config = require('../config/enviroment');
const serviceUser = require('../services/user.service');

// Token debe ser especificado mediante el header "Authorization". Ejemplo:
// Authorization: bearer xxxx.yyyy.zzzz
let jwtOptions = {
    secretOrKey: config.jwt.secreto,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = new passportJWT.Strategy(jwtOptions, (jwtPayload, next) => {

    serviceUser
        .getUser(jwtPayload.id)
        .then(usuario => {
            if (!usuario) {
                console.log(
                    `JWT token no es válido. Usuario con id ${jwtPayload.id} no existe.`
                );
                next(null, false);
                return;
            }
            console.log(`Token valido. Autenticación completada.`);
            next(null, usuario);
        })
        .catch(err => {
            console.log('Error ocurrió al tratar de validar un token.', err);
            next(err);
        });
});