const express = require('express');//Importo express
const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceOferta = require('../services/oferta.service');//Importo el servicio que será como un proxy del modelo de ofertas

const passport = require('passport');//Librería para autentificación
const jwtAuthenticate = passport.authenticate('jwt', { session: false });//Modulo para seguridad de rutas

//===================Defino las rutas===============================================

//Ruta para crear
//router.post('/new', [jwtAuthenticate], async (req, res) => {
router.post('/new', async (req, res) => {
    try {
        const {
            id,
            img,
            descripcion,
            cantidad,
            unidad_medida,
            precio_normal,
            precio_oferta,
            campo_precio_habilitado,
            caducidad,
            id_producto
        } = req.body;
        if (
            id &&
            img &&
            descripcion &&
            cantidad &&
            unidad_medida &&
            precio_normal &&
            precio_oferta &&
            campo_precio_habilitado &&
            caducidad &&
            id_producto
        ) {
            let results = await serviceOferta.insertOferta(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
            if (results) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    message: "Se agregó una nueva oferta"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "La oferta no pudo ser insertada"
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
//router.post('/get_all', [jwtAuthenticate], async (req, res) => {
router.post('/get_all', async (req, res) => {
    try {
        let results = await serviceOferta.getOfertas();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
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
            message: "Sucedio un error al extraer todas las ofertas",
            error
        });
    }
});

//Ruta para obtener datos específicos
//router.post('/get', [jwtAuthenticate], async (req, res) => {
router.post('/get', async (req, res) => {
    try {
        const {
            id
        } = req.body;
        if (id) {
            let results = await serviceOferta.getOferta(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
            message: "Sucedio un error al extraer la oferta",
            error
        });
    }
});


//Ruta para obtener ofertas de un usuario especifico
//router.post('/get', [jwtAuthenticate], async (req, res) => {
router.post('/get_all_by_user', async (req, res) => {
    try {
        const {
            id_user_ofertante
        } = req.body;
        if (id_user_ofertante) {
            let results = await serviceOferta.getOfertasByUser(id_user_ofertante);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos por usuario
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
                message: "El campo id_user_ofertante es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer las ofertas del usuario",
            error
        });
    }
});


//Ruta para obtener ofertas de un producto especifico
//router.post('/get', [jwtAuthenticate], async (req, res) => {
router.post('/get_all_by_producto', async (req, res) => {
    try {
        const {
            id_producto
        } = req.body;
        if (id_producto) {
            let results = await serviceOferta.getOfertasByProducto(id_producto);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos por producto
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
                message: "El campo id_producto es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer las ofertas del producto",
            error
        });
    }
});

//Ruta para actualizar
//router.post('/update', [jwtAuthenticate], async (req, res) => {
router.post('/update', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            let results = await serviceOferta.updateOferta(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
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
            message: "Sucedió un error al actualizar datos de la oferta",
            error
        });
    }
});

//Ruta para un eliminado lógico
//router.post('/update', [jwtAuthenticate], async (req, res) => {
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceOferta.deleteOferta(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Oferta eliminada correctamente"
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
            message: "Sucedió un error al eliminar la oferta",
            error
        });
    }
});

module.exports = router; //exporto todas las rutas a quien lo solicite