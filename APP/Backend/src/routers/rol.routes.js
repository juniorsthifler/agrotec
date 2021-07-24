const express = require('express');
const router = express.Router();
const serviceRol = require('../services/rol.service');


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
            let results = await serviceRol.insertRol(req.body);
            if (results) {
                res.status(200).json({
                    status: true,
                    message: "Se agregó un nuevo rol"
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: "El Rol no pudo ser insertado"
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: "Los campos no pueden estar vacios."
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedió un error",
            error
        });
    }
});

router.post('/get_all', async (req, res) => {
    try {
        let results = await serviceRol.getRoles();
        res.status(200).json({
            status: true,
            data: results,
            message: "Petición satisfactoria"
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer todos los roles",
            error
        });
    }
});

router.post('/get', async (req, res) => {
    try {
        const {
            id
        } = req.body;
        if (id) {
            let results = await serviceRol.getRol(id);
            res.status(200).json({
                status: true,
                data: results,
                message: "Petición satisfactoria"
            });
        } else {
            res.status(400).json({
                status: false,
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer el rol",
            error
        });
    }
});


router.post('/update', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            let results = await serviceRol.updateRol(req.body);
            res.status(results.code).json({
                status: results.status,
                message: results.message,
                error: results.error ? results.error : null
            });
        } else {
            res.status(400).json({
                status: false,
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedió un error al actualizar datos del rol",
            error
        });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await serviceRol.deleteRol(id);
            res.status(200).json({
                status: true,
                message: "rol eliminado correctamente"
            });
        } else {
            res.status(400).json({
                status: false,
                message: "El campo id es obligatorio"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedió un error al eliminar el rol",
            error
        });
    }
});

module.exports = router;