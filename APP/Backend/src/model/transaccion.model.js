const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql


//Función para Insertar
const insertTransaccion = async (data) => {
    const [result] = await connect.execute(
        `INSERT INTO agrotec.transaccion (
            id, 
            cargo_transaccion, 
            sub_total_transaccion, 
            iva, 
            total_transaccion, 
            status_transaccion, 
            id_herramienta_financiera
        ) VALUES (?, ?, ?, ?, ?, ?, ?); `,
        [
            data.id,
            data.cargo_transaccion,
            data.sub_total_transaccion,
            data.iva,
            data.total_transaccion,
            data.status_transaccion,
            data.id_herramienta_financiera
        ]
    );
    let detalle = data.detalle;
    for (let index = 0; index < detalle.length; index++) {
        await connect.execute(
            `INSERT INTO agrotec.detalle_transaccion (
                id, 
                cantidad, 
                unidad_medida, 
                precio_unitario, 
                precio_total, 
                id_transaccion, 
                id_oferta
            ) VALUES (?, ?, ?, ?, ?, ?, ?); `,
            [
                data.id + "_" + detalle[index].id_oferta,
                detalle[index].cantidad,
                detalle[index].unidad_medida,
                detalle[index].precio_unitario,
                detalle[index].precio_total,
                data.id,
                detalle[index].id_oferta
            ]
        );
    }
    return result;
};

//Función para Obtener todos los datos
const getTransacciones = async () => {
    const [result] = await connect.execute(`
    SELECT 
  transaccion.id, transaccion.cargo_transaccion, transaccion.cargo_transaccion, transaccion.iva, transaccion.total_transaccion, transaccion.status_transaccion, transaccion.id_herramienta_financiera,
  detalle.id as id_detalle, detalle.cantidad, detalle.cantidad, detalle.unidad_medida, detalle.precio_unitario, detalle.precio_total, detalle.id_transaccion, detalle.id_oferta 
  FROM agrotec.transaccion transaccion, agrotec.detalle_transaccion detalle 
  WHERE transaccion.estado = 1 AND detalle.estado = 1 AND detalle.id_transaccion = transaccion.id;
    `);
    return result;
};

//Función para obtenr datos especificos
const getTransaccion = async (id) => {
    const [result] = await connect.execute(`SELECT 
    transaccion.id, transaccion.cargo_transaccion, transaccion.cargo_transaccion, transaccion.iva, transaccion.total_transaccion, transaccion.status_transaccion, transaccion.id_herramienta_financiera,
    detalle.id as id_detalle, detalle.cantidad, detalle.cantidad, detalle.unidad_medida, detalle.precio_unitario, detalle.precio_total, detalle.id_transaccion, detalle.id_oferta 
    FROM agrotec.transaccion transaccion, agrotec.detalle_transaccion detalle 
    WHERE transaccion.estado = 1 AND detalle.estado = 1 AND detalle.id_transaccion = transaccion.id AND transaccion.id=?;`, [id]);
    return result;
};

//Función para obtenr datos especificos segun el dni del usuario
const getTransaccionesByUser = async (dni) => {
    const [result] = await connect.execute(`SELECT 
    transaccion.id, transaccion.cargo_transaccion, transaccion.cargo_transaccion, transaccion.iva, transaccion.total_transaccion, transaccion.status_transaccion, transaccion.id_herramienta_financiera,
    detalle.id as id_detalle, detalle.cantidad, detalle.cantidad, detalle.unidad_medida, detalle.precio_unitario, detalle.precio_total, detalle.id_transaccion, detalle.id_oferta 
    FROM agrotec.transaccion transaccion, agrotec.detalle_transaccion detalle, herramienta_financiera herramienta 
    WHERE transaccion.estado = 1 AND detalle.estado = 1 AND detalle.id_transaccion = transaccion.id AND transaccion.id_herramienta_financiera=herramienta.id AND herramienta.id_person=?;`, [dni]);
    return result;
};

//Función para actualizar(la key detalle se debe enviar con la siguiente estructura [{id: 1, id_catalogo_financiero:1, detalle:"404010078546", id_herramienta_finaanciera:1}])
const updateTransaccion = async (body) => {
    let respuesta = null;
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
        } = body;
        let structuracampos = "", arrayCampos = [];
        if (cargo_transaccion) {
            structuracampos = structuracampos + "cargo_transaccion = ?, ";
            arrayCampos.push(cargo_transaccion);
        }
        if (sub_total_transaccion) {
            structuracampos = structuracampos + "sub_total_transaccion = ?, ";
            arrayCampos.push(sub_total_transaccion);
        }
        if (iva) {
            structuracampos = structuracampos + "iva = ?, ";
            arrayCampos.push(iva);
        }
        if (total_transaccion) {
            structuracampos = structuracampos + "total_transaccion = ?, ";
            arrayCampos.push(total_transaccion);
        }
        if (status_transaccion) {
            structuracampos = structuracampos + "status_transaccion = ?, ";
            arrayCampos.push(status_transaccion);
        }
        if (id_herramienta_financiera) {
            structuracampos = structuracampos + "id_herramienta_financiera = ?, ";
            arrayCampos.push(id_herramienta_financiera);
        }
        if (arrayCampos.length > 0) {
            structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE id = ? AND estado = 1;";
            arrayCampos.push(id);
            await connect.execute(`UPDATE agrotec.transaccion SET ${structuracampos}`, arrayCampos);
            if (detalle) {
                for (let index = 0; index < detalle.length; index++) {
                    let structuracamposdetalle = "", arrayCamposdetalle = [];
                    if (detalle[index].cantidad) {
                        structuracamposdetalle = structuracamposdetalle + "cantidad = ?, ";
                        arrayCamposdetalle.push(detalle[index].cantidad);
                    }
                    if (detalle[index].unidad_medida) {
                        structuracamposdetalle = structuracamposdetalle + "unidad_medida = ?, ";
                        arrayCamposdetalle.push(detalle[index].unidad_medida);
                    }
                    if (detalle[index].precio_unitario) {
                        structuracamposdetalle = structuracamposdetalle + "precio_unitario = ?, ";
                        arrayCamposdetalle.push(detalle[index].precio_unitario);
                    }
                    if (detalle[index].precio_total) {
                        structuracamposdetalle = structuracamposdetalle + "precio_total = ?, ";
                        arrayCamposdetalle.push(detalle[index].precio_total);
                    }
                    if (detalle[index].id_transaccion) {
                        structuracamposdetalle = structuracamposdetalle + "id_transaccion = ?, ";
                        arrayCamposdetalle.push(detalle[index].id_transaccion);
                    }
                    if (detalle[index].id_oferta) {
                        structuracamposdetalle = structuracamposdetalle + "id_oferta = ?, ";
                        arrayCamposdetalle.push(detalle[index].id_oferta);
                    }
                    if (arrayCamposdetalle.length > 0 && detalle[index].id) {
                        structuracamposdetalle = structuracamposdetalle.substring(0, (structuracamposdetalle.length - 2)) + " WHERE id = ? AND estado = 1;";
                        arrayCamposdetalle.push(detalle[index].id);
                        await connect.execute(`UPDATE agrotec.detalle_transaccion SET ${structuracamposdetalle}`, arrayCamposdetalle);
                    }
                }
            }
            respuesta = {
                code: 200,
                status: true,
                message: "Transacción actualizada correctamente"
            }
        } else {
            let aux = false;
            if (detalle) {
                if (detalle) {
                    for (let index = 0; index < detalle.length; index++) {
                        let structuracamposdetalle = "", arrayCamposdetalle = [];
                        if (detalle[index].cantidad) {
                            structuracamposdetalle = structuracamposdetalle + "cantidad = ?, ";
                            arrayCamposdetalle.push(detalle[index].cantidad);
                        }
                        if (detalle[index].unidad_medida) {
                            structuracamposdetalle = structuracamposdetalle + "unidad_medida = ?, ";
                            arrayCamposdetalle.push(detalle[index].unidad_medida);
                        }
                        if (detalle[index].precio_unitario) {
                            structuracamposdetalle = structuracamposdetalle + "precio_unitario = ?, ";
                            arrayCamposdetalle.push(detalle[index].precio_unitario);
                        }
                        if (detalle[index].precio_total) {
                            structuracamposdetalle = structuracamposdetalle + "precio_total = ?, ";
                            arrayCamposdetalle.push(detalle[index].precio_total);
                        }
                        if (detalle[index].id_transaccion) {
                            structuracamposdetalle = structuracamposdetalle + "id_transaccion = ?, ";
                            arrayCamposdetalle.push(detalle[index].id_transaccion);
                        }
                        if (detalle[index].id_oferta) {
                            structuracamposdetalle = structuracamposdetalle + "id_oferta = ?, ";
                            arrayCamposdetalle.push(detalle[index].id_oferta);
                        }
                        if (arrayCamposdetalle.length > 0 && detalle[index].id) {
                            structuracamposdetalle = structuracamposdetalle.substring(0, (structuracamposdetalle.length - 2)) + " WHERE id = ? AND estado = 1;";
                            arrayCamposdetalle.push(detalle[index].id);
                            await connect.execute(`UPDATE agrotec.detalle_transaccion SET ${structuracamposdetalle}`, arrayCamposdetalle);
                            aux = true;
                        }
                    }
                }
            }
            if (aux) {
                respuesta = {
                    code: 200,
                    status: true,
                    message: "Tranacción actualizada correctamente"
                }
            } else {
                respuesta = {
                    code: 400,
                    status: false,
                    message: "No existen datos para actualizar"
                }
            }
        }
    } catch (error) {
        respuesta = {
            code: 400,
            status: false,
            message: "Sucedio un error al actualizar la transacción",
            error
        }
    }
    return respuesta;
};

//Función para eliminar
const deleteTransaccion = async (id) => {
    const [result] = await connect.execute(`UPDATE agrotec.transaccion SET estado = 0 WHERE id = ?;`, [id]);
    return result;
};

module.exports = {
    insertTransaccion,
    getTransacciones,
    getTransaccion,
    getTransaccionesByUser,
    updateTransaccion,
    deleteTransaccion
}; // exportar los modulos