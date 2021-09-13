const express = require('express');//Importo express
const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceCatalogoFinanciero = require('../services/catalogo_financiero.service');//Importo el servicio que será como un proxy del modelo de rol

const passport = require('passport');//Librería para autentificación
const jwtAuthenticate = passport.authenticate('jwt', { session: false });//Modulo para seguridad de rutas

//===================Defino las rutas===============================================

//Ruta para crear
router.post('/new', [jwtAuthenticate], async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            tipo_dato_primitive
        } = req.body;
        if (
            nombre &&
            descripcion &&
            tipo_dato_primitive
        ) {
            let results = await serviceCatalogoFinanciero.insertCatalogoFinanciero(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
            if (results) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    message: "Se agregó un nuevo catalogo financiero"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "El Catalogo financiero no pudo ser insertado"
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
router.post('/get_all', [jwtAuthenticate], async (req, res) => {
    try {
        let results = await serviceCatalogoFinanciero.getCatalogosFinancieros();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
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
            message: "Sucedio un error al extraer todos los catalogos financieros",
            error
        });
    }
});

//Ruta para obtener datos específicos
router.post('/get', [jwtAuthenticate], async (req, res) => {
    try {
        const {
            id
        } = req.body;
        if (id) {
            let results = await serviceCatalogoFinanciero.getCatalogoFinanciero(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
            message: "Sucedio un error al extraer el catalogo financiero",
            error
        });
    }
});


//Ruta para actualizar
router.post('/update', [jwtAuthenticate], async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            let results = await serviceCatalogoFinanciero.updateCatalogoFinanciero(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
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
            message: "Sucedió un error al actualizar datos del catalogo financiero",
            error
        });
    }
});

//Ruta para un eliminado lógico
router.post('/delete', [jwtAuthenticate], async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceCatalogoFinanciero.deleteCatalogoFinanciero(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Catalogo financiero eliminado correctamente"
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
            message: "Sucedió un error al eliminar el catalogo financiero",
            error
        });
    }
});

module.exports = router; //exporto todas las rutas a quien lo solicite