const express = require('express');
const router = express.Router();
const serviceUser = require('../services/user.service');
const serviceRol = require('../services/rol.service');

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
                let results = await serviceUser.insertUser(req.body);
                if (results) {
                    res.status(200).json({
                        status: true,
                        message: "Se agregó un nuevo usuario"
                    });
                } else {
                    res.status(400).json({
                        status: false,
                        message: "El usuario no pudo ser insertado"
                    });
                }
            } else {
                res.status(400).json({
                    status: false,
                    message: "El id del rol no existe."
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
        let results = await serviceUser.getUsers();
        res.status(200).json({
            status: true,
            data: results,
            message: "Petición satisfactoria"
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer todos los usuarios",
            error
        });
    }
});

router.post('/get', async (req, res) => {
    try {
        const {
            dni
        } = req.body;
        if (dni) {
            let results = await serviceUser.getUser(dni);
            res.status(200).json({
                status: true,
                data: results,
                message: "Petición satisfactoria"
            });
        } else {
            res.status(400).json({
                status: false,
                message: "El campo dni es obligatorio"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedio un error al extraer el usuario",
            error
        });
    }
});


router.post('/update', async (req, res) => {
    try {
        const { dni, id_rol } = req.body;
        if (dni) {
            if (id_rol) {
                let auxrol = await serviceRol.getRol(id_rol);
                if (auxrol.length > 0) {
                    let results = await serviceUser.updateUser(req.body);
                    res.status(results.code).json({
                        status: results.status,
                        message: results.message,
                        error: results.error ? results.error : null
                    });
                } else {
                    res.status(400).json({
                        status: false,
                        message: "El id del rol no existe."
                    });
                }
            } else {
                let results = await serviceUser.updateUser(req.body);
                res.status(results.code).json({
                    status: results.status,
                    message: results.message,
                    error: results.error ? results.error : null
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: "El campo dni es obligatorio"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedió un error al actualizar datos del usuario",
            error
        });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { dni } = req.body;
        if (dni) {
            await serviceUser.deleteUser(dni);
            res.status(200).json({
                status: true,
                message: "Usuario eliminado correctamente"
            });
        } else {
            res.status(400).json({
                status: false,
                message: "El campo dni es obligatorio"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sucedió un error al eliminar el usuario",
            error
        });
    }
});

module.exports = router;