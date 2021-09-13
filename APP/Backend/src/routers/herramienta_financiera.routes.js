const express = require('express');//Importo express
const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceHerramientaFinanciera = require('../services/herramienta_financiera.service');//Importo el servicio que será como un proxy del modelo de rol

const passport = require('passport');//Librería para autentificación
const jwtAuthenticate = passport.authenticate('jwt', { session: false });//Modulo para seguridad de rutas

//===================Defino las rutas===============================================

//Ruta para crear
//la key detalle se debe enviar con la siguiente estructura [{id_catalogo_financiero:1, detalle:"404010078546"}]
//router.post('/new', [jwtAuthenticate], async (req, res) => {
router.post('/new', async (req, res) => {
    try {
        const {
            id,
            entidad_financiera,
            tipo_herramienta,
            id_person,
            detalle
        } = req.body;
        if (
            id &&
            entidad_financiera &&
            tipo_herramienta &&
            id_person &&
            detalle
        ) {
            let results = await serviceHerramientaFinanciera.insertHerramientaFinanciera(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
            if (results) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    message: "Se agregó una nueva herramienta financiera"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "La herramienta financiera no pudo ser insertada"
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
        let results = await serviceHerramientaFinanciera.getHerramientasFinancieras();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
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
            message: "Sucedio un error al extraer todas las herramientas financieros",
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
            let results = await serviceHerramientaFinanciera.getHerramientaFinanciera(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
            message: "Sucedio un error al extraer la herramienta financiera",
            error
        });
    }
});

//Ruta para obtener datos específicos de herramientas financieras según un dni de usuario
//router.post('/get_all_by_user', [jwtAuthenticate], async (req, res) => {
router.post('/get_all_by_user', async (req, res) => {
    try {
        const {
            dni_person
        } = req.body;
        if (dni_person) {
            let results = await serviceHerramientaFinanciera.getHerramientasFinancierasByUser(dni_person);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
            message: "Sucedio un error al extraer las herramientas financieras del usuario",
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
            let results = await serviceHerramientaFinanciera.updateHerramientaFinanciera(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
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
            message: "Sucedió un error al actualizar datos de la herramienta financiera",
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
            await serviceHerramientaFinanciera.deleteHerramientaFinanciera(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Herramiena financiera eliminada correctamente"
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
            message: "Sucedió un error al eliminar la herramienta financiera",
            error
        });
    }
});

module.exports = router; //exporto todas las rutas a quien lo solicite