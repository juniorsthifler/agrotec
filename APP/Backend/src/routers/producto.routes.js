const express = require('express');//Importo express
const router = express.Router();//Creo una variable de tipo rutas desde express
const serviceProducto = require('../services/producto.service');//Importo el servicio que será como un proxy del modelo de productos

const passport = require('passport');//Librería para autentificación
const jwtAuthenticate = passport.authenticate('jwt', { session: false });//Modulo para seguridad de rutas

//===================Defino las rutas===============================================

//Ruta para crear
//router.post('/new', [jwtAuthenticate], async (req, res) => {
router.post('/new', async (req, res) => {
    try {
        const {
            id,
            nombre,
            stock,
            unidad_medida_stock,
            id_user_ofertante
        } = req.body;
        if (
            id &&
            nombre &&
            stock &&
            unidad_medida_stock &&
            id_user_ofertante
        ) {
            let results = await serviceProducto.insertProducto(req.body);//Envio al servicio proxy los datos para que luego se envie al modelo de inserción de datos
            if (results) {
                //Respondo al cliente
                res.status(200).json({
                    status: true,
                    message: "Se agregó un nuevo producto"
                });
            } else {
                //Respondo al cliente
                res.status(400).json({
                    status: false,
                    message: "El producto no pudo ser insertado"
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
        let results = await serviceProducto.getProductos();//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de todos los datos
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
            message: "Sucedio un error al extraer todos los productos",
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
            let results = await serviceProducto.getProducto(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos
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
            message: "Sucedio un error al extraer el producto",
            error
        });
    }
});


//Ruta para obtener productos de un usuario especifico
//router.post('/get', [jwtAuthenticate], async (req, res) => {
router.post('/get_all_by_user', async (req, res) => {
    try {
        const {
            id_user_ofertante
        } = req.body;
        if (id_user_ofertante) {
            let results = await serviceProducto.getProductosByUser(id_user_ofertante);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de Obtención de datos especificos por usuario
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
            message: "Sucedio un error al extraer los productos del usuario",
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
            let results = await serviceProducto.updateProducto(req.body);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de actualización de datos
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
            message: "Sucedió un error al actualizar datos del producto",
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
            await serviceProducto.deleteProducto(id);//Llamo al servicio proxy una solicitud para que luego se envie al modelo de eliminación lógica de datos
            //Respondo al cliente
            res.status(200).json({
                status: true,
                message: "Producto eliminado correctamente"
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
            message: "Sucedió un error al eliminar el producto",
            error
        });
    }
});

module.exports = router; //exporto todas las rutas a quien lo solicite