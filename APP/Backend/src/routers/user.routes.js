const express = require('express');//Importo express

const jwt = require('jsonwebtoken');//Librería para seguridad de rutas
const passport = require('passport');//Librería para autentificación
const config = require('./../config/enviroment');
const jwtAuthenticate = passport.authenticate('jwt', { session: false });//Modulo para seguridad de rutas

const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceUser = require('../services/user.service');//Importo el servicio que será como un proxy del modelo de user
const serviceRol = require('../services/rol.service');//Importo el servicio que será como un proxy del modelo de rol

//===================Defino las rutas===============================================

//Ruta para crear
router.post('/new', async (req, res) => {
    try {
        const {
            dni,
            full_name,
            date_birth,
            celular,
            email,
            user,
            password,
            direction,
            id_rol
        } = req.body;
        if (
            dni &&
            full_name &&
            date_birth &&
            celular &&
            email &&
            user &&
            password &&
            direction &&
            id_rol
        ) {
            let auxrol = await serviceRol.getRol(id_rol);
            if (auxrol.length > 0) {
                let results = await serviceUser.insertUser(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
                if (results) {
                    //Respondo al cliente
                    res.status(200).json({
                        status: true,
                        data: "user",
                        token: crearToken({ id: req.body.dni }),
                        message: "Se agregó un nuevo usuario"
                    });
                } else {
                    //Respondo al cliente
                    res.status(400).json({
                        status: false,
                        data: null,
                        token: null,
                        message: "El usuario no pudo ser insertado"
                    });
                }
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    data: null,
                    token: null,
                    message: "El id del rol no existe."
                });
            }
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                data: null,
                token: null,
                message: "Los campos no pueden estar vacios."
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            data: null,
            token: null,
            message: "Sucedió un error",
            error
        });
    }
});

//Ruta para obtener todos los datos
router.post('/get_all', [jwtAuthenticate], async (req, res) => {
    try {
        let results = await serviceUser.getUsers();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
        //Respondo al cliente
        res.status(200).json({
            status: true,
            data: results,
            message: "Petición satisfactoria"
        });
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer todos los usuarios",
            error
        });
    }
});

//Ruta para obtener datos específicos
router.post('/get', [jwtAuthenticate], async (req, res) => {
    try {
        const {
            dni
        } = req.body;
        if (dni) {
            let results = await serviceUser.getUser(dni);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                data: results,
                message: "Petición satisfactoria"
            });
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                message: "El campo dni es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer el usuario",
            error
        });
    }
});


//Ruta para actualizar
router.post('/update', [jwtAuthenticate], async (req, res) => {
    try {
        const { dni, id_rol } = req.body;
        if (dni) {
            if (id_rol) {
                let auxrol = await serviceRol.getRol(id_rol);
                if (auxrol.length > 0) {
                    let results = await serviceUser.updateUser(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
                    //Respondo al cliente
                    res.status(results.code).json({
                        status: results.status,
                        message: results.message,
                        error: results.error ? results.error : null
                    });
                } else {
                    //Respondo al cliente
                    res.status(400).json({
                        status: false,
                        message: "El id del rol no existe."
                    });
                }
            } else {
                let results = await serviceUser.updateUser(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
                //Respondo al cliente
                res.status(results.code).json({
                    status: results.status,
                    message: results.message,
                    error: results.error ? results.error : null
                });
            }
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                message: "El campo dni es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedió un error al actualizar datos del usuario",
            error
        });
    }
});

//Ruta para un eliminado lógico
router.post('/delete', [jwtAuthenticate], async (req, res) => {
    try {
        const { dni } = req.body;
        if (dni) {
            await serviceUser.deleteUser(dni);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Usuario eliminado correctamente"
            });
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                message: "El campo dni es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedió un error al eliminar el usuario",
            error
        });
    }
});

//Ruta para agregar un rol
router.post('/add_rol', [jwtAuthenticate], async (req, res) => {
    try {
        const {
            dni,
            id_rol
        } = req.body;
        if (
            dni &&
            id_rol
        ) {
            let auxrol = await serviceRol.getRol(id_rol);
            if (auxrol.length > 0) {
                let results = await serviceUser.addRol(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de agregar roles
                if (results) {
                    //Respondo al cliente
                    res.status(200).json({
                        status: true,
                        message: "Se agregó un nuevo rol al usuario " + dni
                    });
                } else {
                    //Respondo al cliente
                    res.status(400).json({
                        status: false,
                        message: "El rol no pudo ser agregado al usuario " + dni
                    });
                }
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "El id del rol no existe."
                });
            }
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                message: "Los campos no pueden estar vacios."
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedió un error",
            error
        });
    }
});

//Ruta para Desactivar un rol
router.post('/disable_rol', [jwtAuthenticate], async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceUser.disableRol(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de desactivar un rol
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Rol de usuario desactivado correctamente"
            });
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedió un error al desactivar el rol",
            error
        });
    }
});

//Ruta para Activar un rol
router.post('/enable_rol', [jwtAuthenticate], async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceUser.enableRol(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de activar un rol
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Rol de usuario activado correctamente"
            });
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedió un error al activar el rol",
            error
        });
    }
});


//Ruta para Login
router.post('/login', async (req, res) => {
    try {
        const {
            user,
            password
        } = req.body;
        if (user, password) {
            let results = await serviceUser.Login(user, password);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de login

            if (results.length > 0) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    data: results,
                    token: crearToken({ id: results[0].dni }),
                    message: "Acceso correcto"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    data: null,
                    token: null,
                    message: "User o password incorrectos"
                });
            }
        } else {
            //Respondo al cliente
            res.status(400).json({
                status: false,
                data: null,
                token: null,
                message: "Los campo user y password son obligatorios"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            data: null,
            token: null,
            message: "Sucedió un error al loguear usuario",
            error
        });
    }
});




//Ruta para obtener datos de usuario logueado
router.post('/me', [jwtAuthenticate], async (req, res) => {
    try {
        //Respondo al cliente
        res.status(200).json({
            status: true,
            data: req.user,
            message: "Acceso permitido"
        });
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            data: null,
            message: "No tiene acceso, autentifiquese nuevamente",
            error
        });
    }
});

//Función para crear el token
function crearToken(data) {
    return jwt.sign(data, config.jwt.secreto, {
        expiresIn: config.jwt.tiempoDeExpiracion
    });
}

module.exports = router;