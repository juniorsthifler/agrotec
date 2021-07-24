const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const serviceEntity = require('../services/entity.service');
const config = require('../config/enviroment');
const jwtAuthenticate = passport.authenticate('jwt', { session: false });

/**
 * @api {post} /entity Get entity
 * @apiName getEntity
 * @apiGroup Entidad Financiera
 * @apiVersion 1.0.0
 * @apiParam {Number} id_entity Identificador de la entidad.
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *{
 *   "status": true,
 *   "data": [
 *       {
 *           "idEntidad": 1,
 *           "titulo_pagina": "Fintech - Apertura de cuenta en línea",
 *           "nombre": "Fintech",
 *           "logo_horizontal": "https://www.fintech.kradac.com:3006/storage/uploads/fintech/logo_h.png",
 *           "logo_vertical": "https://www.fintech.kradac.com:3006/storage/uploads/fintech/logo_h.png",
 *           "color_primario": "#4A9D24",
 *           "color_secundario": "#14780a",
 *           "favicon": "https://www.fintech.kradac.com:3006/storage/uploads/fintech/favicon.png",
 *           "direccion": "Av. Manuel Agustin Aguirre y Juan de Salinas",
 *           "copyright": "Fintech Ecuador 2020. Todos los Derechos reservados.",
 *           "contacto": "0995648512",
 *           "correo": "info@fintech.com",
 *           "lema": "Texto de prueba",
 *           "facebook": "https://www.facebook.com/",
 *           "twitter": "https://www.twitter.com/",
 *           "activo_bot": null,
 *           "tiempo_respuesta_bot": null,
 *           "nro_intentos_fallidos": null,
 *           "tiempo_bloqueo": null,
 *           "ip_produccion": null,
 *           "ip_dev": null,
 *           "fecha_actualizacion": "2021-03-04T22:24:58.000Z",
 *           "fecha_registro": "2020-01-11T22:36:22.000Z",
 *           "eliminado": 0,
 *           "ciudad_idCiudad": 2,
 *           "respaldocliente": 0
 *       }
 *   ],
 *   "message": "Petición cortrecta"
}
 */


router.post('/', async (req, res) => {
  const { id_entity } = req.body;
  if (id_entity) {
    let results = await serviceEntity.getEntity(id_entity);
    if (results) {
      let token = crearToken(id_entity);
      res.status(200).json({ token, results });
    } else {
      res.status(400).json({ status: "Acceso no permitido" });
    }
  } else {
    res.status(400).json({
      id: 'no definido',
    });
  }
});




/**
 * @api {post} /entity/all Obtiene todas las entidades
 * @apiName all
 * @apiGroup Entidad Financiera
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *     {
 *         "nombre": "Fintech",
 *         "logo_horizontal": "/url/prueba/fintech.png",
 *         "logo_vertical": "/url/prueba/verticalfintech.png",
 *         "color_primario": "#ffff",
 *         "color_secundario": "#fff",
 *         "copyright": "Texto de prueba",
 *         "contacto": "Calle Lalala y Av. XXXX",
 *         "correo": "info@fintech.com",
 *         "lema": "Texto de prueba",
 *         "facebook": "fintechec",
 *         "twitter": "fintechec"
 *     }
 * ]
 *
 */


router.post('/all', async (req, res) => {
  let results = await serviceEntity.getAll();
  if (results) {
    res.status(200).json({
      status: true,
      data: results,
      message: "Petición cortrecta"
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Error al extraer las entidades"
    });
  }
});





/**
 * @api {post} /entity/set_entity Set entity
 * @apiName set_entity
 * @apiGroup Entidad Financiera
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Token obtenido desde el backend al momento de utilizar el api /entity.
 * @apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "bearer TOKEN_DEVUELTO_BACKEND_API_ENTITY"
 * }
 * @apiParam {String} titulo_pagina El titulo para la página web.
 * @apiParam {String} nombre Nombre de la entidad financiera.
 * @apiParam {String} logo_horizontal path relativo del logo de la entidad.
 * @apiParam {String} logo_vertical path relativo del logo de la entidad.
 * @apiParam {String} color_primario color principal de la entidad.
 * @apiParam {String} color_secundario color secundario de la entidad .
 * @apiParam {String} copyright Mensaje de copyright de la empresa.
 * @apiParam {String} contacto Numero de contacto con la entidad.
 * @apiParam {String} lema Lema de la entidad financiera.
 * @apiParam {String} facebook url de la cuenta de facebook.
 * @apiParam {String} twitter url de la cuenta de twitter.
 * @apiParam {Number} id_ciudad identificador a la ciudad que pertenece.
 * @apiParam {Boolean} activo_bot 0 inactivo, 1 activo.
 * @apiParam {String} tiempo_respuesta_bot tiempo en milisegundos para el bot.
 * @apiParam {String} ip_produccion ip de produccion de la entidad financiera.
 * @apiParam {String} ip_dev ip de desarrollo de la entidad financiera.
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *     "fieldCount": 0,
 *     "affectedRows": 1,
 *     "insertId": 7,
 *     "info": "",
 *     "serverStatus": 2,
 *     "warningStatus": 0
 * }
 *
 */
router.post('/set_entity', [jwtAuthenticate], async (req, res) => {
  const body = req.body;
  console.log(body);
  const results = await serviceEntity.setEntity(
    body.titulo_pagina,
    body.nombre,
    body.logo_horizontal,
    body.logo_vertical,
    body.color_primario,
    body.color_secundario,
    body.copyright,
    body.contacto,
    body.correo,
    body.lema,
    body.facebook,
    body.twitter,
    body.id_ciudad,
    body.activo_bot,
    body.tiempo_respuesta_bot,
    body.ip_produccion,
    body.ip_dev
  );
  res.send(results);
});
/**
 * @api {post} /entity/update_entity Update entity
 * @apiName update_entity
 * @apiGroup Entidad Financiera
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Token obtenido desde el backend al momento de utilizar el api /entity.
 * @apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "bearer TOKEN_DEVUELTO_BACKEND_API_ENTITY"
 * }
 * @apiParam {String} titulo_pagina El titulo para la página web.
 * @apiParam {String} nombre Nombre de la entidad financiera.
 * @apiParam {String} logo_horizontal path relativo del logo de la entidad.
 * @apiParam {String} logo_vertical path relativo del logo de la entidad.
 * @apiParam {String} color_primario color principal de la entidad.
 * @apiParam {String} color_secundario color secundario de la entidad .
 * @apiParam {String} copyright Mensaje de copyright de la empresa.
 * @apiParam {String} contacto Numero de contacto con la entidad.
 * @apiParam {String} lema Lema de la entidad financiera.
 * @apiParam {String} facebook url de la cuenta de facebook.
 * @apiParam {String} twitter url de la cuenta de twitter.
 * @apiParam {Number} id_ciudad identificador a la ciudad que pertenece.
 * @apiParam {Boolean} activo_bot 0 inactivo, 1 activo.
 * @apiParam {String} tiempo_respuesta_bot tiempo en milisegundos para el bot.
 * @apiParam {String} ip_produccion ip de produccion de la entidad financiera.
 * @apiParam {String} ip_produccion ip de desarrollo de la entidad financiera.
 * @apiParam {Number} id_entidad Identificador de la entidad a actualizar.
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *     "fieldCount": 0,
 *     "affectedRows": 1,
 *     "insertId": 0,
 *     "info": "Rows matched: 1  Changed: 1  Warnings: 0",
 *     "serverStatus": 2,
 *     "warningStatus": 0,
 *     "changedRows": 1
 * }
 *
 */
router.post('/update_entity', [jwtAuthenticate], async (req, res) => {
  const body = req.body;
  console.log(body);
  const result = await serviceEntity.updateEntity(
    body.titulo_pagina,
    body.nombre,
    body.logo_horizontal,
    body.logo_vertical,
    body.color_primario,
    body.color_secundario,
    body.copyright,
    body.contacto,
    body.correo,
    body.lema,
    body.facebook,
    body.twitter,
    body.id_ciudad,
    body.activo_bot,
    body.tiempo_respuesta_bot,
    body.ip_produccion,
    body.ip_dev,
    body.id_entidad
  );

  res.status(200).json(result);
});
/**
 * @api {post} /entity/delete_entity Delete entity
 * @apiName delete_entity
 * @apiGroup Entidad Financiera
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Token obtenido desde el backend al momento de utilizar el api /entity.
 * @apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "bearer TOKEN_DEVUELTO_BACKEND_API_ENTITY"
 * }
 * @apiParam {Number} eliminado Para eliminar 1 para recuperar 0.
 * @apiParam {Number} id_entidad ID de la entidad financiera.
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *     "fieldCount": 0,
 *     "affectedRows": 1,
 *     "insertId": 0,
 *     "info": "Rows matched: 1  Changed: 1  Warnings: 0",
 *     "serverStatus": 2,
 *     "warningStatus": 0,
 *     "changedRows": 1
 * }
 *
 */
router.post('/delete_entity', [jwtAuthenticate], async (req, res) => {
  const body = req.body;

  const result = await serviceEntity.deleteEntity(
    parseInt(body.eliminado),
    body.id_entidad
  );
  res.status(200).json(result);
});




function crearToken(usuarioId) {
  return jwt.sign({ id: usuarioId }, config.jwt.secreto, {
    expiresIn: config.jwt.tiempoDeExpiracion
  });
}


module.exports = router;
