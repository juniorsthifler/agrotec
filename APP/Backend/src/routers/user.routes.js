const express = require('express');//Importo express
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
                        message: "Se agregó un nuevo usuario"
                    });
                } else {
                    //Respondo al cliente
                    res.status(400).json({
                        status: false,
                        message: "El usuario no pudo ser insertado"
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

//Ruta para obtener todos los datos
router.post('/get_all', async (req, res) => {
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
router.post('/get', async (req, res) => {
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
router.post('/update', async (req, res) => {
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
router.post('/delete', async (req, res) => {
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
router.post('/add_rol', async (req, res) => {
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
router.post('/disable_rol', async (req, res) => {
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
router.post('/enable_rol', async (req, res) => {
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
module.exports = router;