const express = require('express');//Importo express
const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceTransacciones = require('../services/transaccion.service');//Importo el servicio que será como un proxy del modelo de la transacción

const passport = require('passport');//Librería para autentificación
const jwtAuthenticate = passport.authenticate('jwt', { session: false });//Modulo para seguridad de rutas

//===================Defino las rutas===============================================

//Ruta para crear
//la key detalle se debe enviar con la siguiente estructura [{cantidad:2, unidad_medida:"LIBRAS",precio_unitario: 21.0, precio_total:21.0, id_oferta:" O12132-1"}]
//router.post('/new', [jwtAuthenticate], async (req, res) => {
router.post('/new', async (req, res) => {
    try {
        const {
            id,
            cargo_transaccion,
            sub_total_transaccion,
            iva,
            total_transaccion,
            status_transaccion,
            id_herramienta_financiera,
            detalle
        } = req.body;
        if (
            id &&
            cargo_transaccion &&
            sub_total_transaccion &&
            iva &&
            total_transaccion &&
            status_transaccion &&
            id_herramienta_financiera &&
            detalle
        ) {
            let results = await serviceTransacciones.insertTransaccion(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
            if (results) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    message: "Se agregó una nueva transacción"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "La transacción no pudo ser insertada"
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
        let results = await serviceTransacciones.getTransacciones();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
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
            message: "Sucedio un error al extraer todas las transacciones",
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
            let results = await serviceTransacciones.getTransaccion(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
            message: "Sucedio un error al extraer la transacción",
            error
        });
    }
});

//Ruta para obtener datos específicos de transacciones según un dni de usuario
//router.post('/get_all_by_user', [jwtAuthenticate], async (req, res) => {
router.post('/get_all_by_user', async (req, res) => {
    try {
        const {
            dni_person
        } = req.body;
        if (dni_person) {
            let results = await serviceTransacciones.getTransaccionesByUser(dni_person);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
                message: "El campo dni_person es obligatorio"
            });
        }
    } catch (error) {
        //Respondo al cliente
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer las transacciones del usuario",
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
            let results = await serviceTransacciones.updateTransaccion(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
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
            message: "Sucedió un error al actualizar datos de la transacción",
            error
        });
    }
});

//Ruta para un eliminado lógico
//router.post('/delete', [jwtAuthenticate], async (req, res) => {
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceTransacciones.deleteTransaccion(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Transacción eliminada correctamente"
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
            message: "Sucedió un error al eliminar la transacción",
            error
        });
    }
});

module.exports = router; //exporto todas las rutas a quien lo solicite