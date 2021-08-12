const express = require('express');//Importo express
const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceRol = require('../services/rol.service');//Importo el servicio que será como un proxy del modelo de rol


//===================Defino las rutas===============================================

//Ruta para crear
router.post('/new', async (req, res) => {
    try {
        const {
            rol,
            descripcion
        } = req.body;
        if (
            rol &&
            descripcion
        ) {
            let results = await serviceRol.insertRol(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
            if (results) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    message: "Se agregó un nuevo rol"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "El Rol no pudo ser insertado"
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
        let results = await serviceRol.getRoles();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
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
            message: "Sucedio un error al extraer todos los roles",
            error
        });
    }
});

//Ruta para obtener datos específicos
router.post('/get', async (req, res) => {
    try {
        const {
            id
        } = req.body;
        if (id) {
            let results = await serviceRol.getRol(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer el rol",
            error
        });
    }
});


//Ruta para actualizar
router.post('/update', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            let results = await serviceRol.updateRol(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
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
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedió un error al actualizar datos del rol",
            error
        });
    }
});

//Ruta para un eliminado lógico
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceRol.deleteRol(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "rol eliminado correctamente"
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
            message: "Sucedió un error al eliminar el rol",
            error
        });
    }
});

module.exports = router; //exporto todas las rutas a quien lo solicite