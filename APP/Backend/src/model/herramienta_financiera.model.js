const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql


//Función para Insertar
const insertHerramientaFinanciera = async (data) => {
    const [result] = await connect.execute(
        `INSERT INTO agrotec.herramienta_financiera (id, entidad_financiera, tipo_herramienta, id_person) VALUES (?, ?, ?, ?); `,
        [
            data.id,
            data.entidad_financiera,
            data.tipo_herramienta,
            data.id_person
        ]
    );
    let detalle = data.detalle;
    for (let index = 0; index < detalle.length; index++) {
        await connect.execute(
            `INSERT INTO agrotec.detalle_herramienta_financiera (id, detalle, id_herramienta_financiera, id_catalogo_financiero) VALUES (?, ?, ?, ?); `,
            [
                data.id + "_" + detalle[index].id_catalogo_financiero,
                detalle[index].detalle,
                data.id,
                detalle[index].id_catalogo_financiero
            ]
        );
    }


    return result;
};

//Función para Obtener todos los datos
const getHerramientasFinancieras = async () => {
    const [result] = await connect.execute(`
    SELECT 
  herramienta.id, herramienta.entidad_financiera, herramienta.tipo_herramienta, herramienta.id_person as dni_person,
  detalle.id as id_detalle, detalle.detalle,  
  catalogo.id as id_catalogo, catalogo.nombre
  FROM agrotec.herramienta_financiera herramienta, agrotec.detalle_herramienta_financiera detalle, agrotec.catalogo_financiero catalogo 
  WHERE herramienta.estado = 1 AND detalle.estado = 1 AND catalogo.estado = 1 AND detalle.id_herramienta_financiera = herramienta.id AND detalle.id_catalogo_financiero = catalogo.id;
    `);
    return result;
};

//Función para obtenr datos especificos
const getHerramientaFinanciera = async (id) => {
    const [result] = await connect.execute(`SELECT 
    herramienta.id, herramienta.entidad_financiera, herramienta.tipo_herramienta, herramienta.id_person as dni_person,
    detalle.id as id_detalle, detalle.detalle,  
    catalogo.id as id_catalogo, catalogo.nombre
    FROM agrotec.herramienta_financiera herramienta, agrotec.detalle_herramienta_financiera detalle, agrotec.catalogo_financiero catalogo 
    WHERE herramienta.estado = 1 AND detalle.estado = 1 AND catalogo.estado = 1 AND detalle.id_herramienta_financiera = herramienta.id AND detalle.id_catalogo_financiero = catalogo.id AND herramienta.id=?;`, [id]);
    return result;
};

//Función para obtenr datos especificos segun el dni del usuario
const getHerramientasFinancierasByUser = async (dni) => {
    const [result] = await connect.execute(`SELECT 
    herramienta.id, herramienta.entidad_financiera, herramienta.tipo_herramienta, herramienta.id_person as dni_person,
    detalle.id as id_detalle, detalle.detalle,  
    catalogo.id as id_catalogo, catalogo.nombre
    FROM agrotec.herramienta_financiera herramienta, agrotec.detalle_herramienta_financiera detalle, agrotec.catalogo_financiero catalogo 
    WHERE herramienta.estado = 1 AND detalle.estado = 1 AND catalogo.estado = 1 AND detalle.id_herramienta_financiera = herramienta.id AND detalle.id_catalogo_financiero = catalogo.id AND herramienta.id_person=?;`, [dni]);
    return result;
};

//Función para actualizar(la key detalle se debe enviar con la siguiente estructura [{id: 1, id_catalogo_financiero:1, detalle:"404010078546", id_herramienta_finaanciera:1}])
const updateHerramientaFinanciera = async (body) => {
    let respuesta = null;
    try {
        const {
            id,
            entidad_financiera,
            tipo_herramienta,
            id_person,
            detalle
        } = body;
        let structuracampos = "", arrayCampos = [];
        if (entidad_financiera) {
            structuracampos = structuracampos + "entidad_financiera = ?, ";
            arrayCampos.push(entidad_financiera);
        }
        if (tipo_herramienta) {
            structuracampos = structuracampos + "tipo_herramienta = ?, ";
            arrayCampos.push(tipo_herramienta);
        }
        if (id_person) {
            structuracampos = structuracampos + "id_person = ?, ";
            arrayCampos.push(id_person);
        }
        if (arrayCampos.length > 0) {
            structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE id = ? AND estado = 1;";
            arrayCampos.push(id);
            await connect.execute(`UPDATE agrotec.herramienta_financiera SET ${structuracampos}`, arrayCampos);
            if (detalle) {
                for (let index = 0; index < detalle.length; index++) {
                    let structuracamposdetalle = "", arrayCamposdetalle = [];
                    if (detalle[index].id_catalogo_financiero) {
                        structuracamposdetalle = structuracamposdetalle + "id_catalogo_financiero = ?, ";
                        arrayCamposdetalle.push(detalle[index].id_catalogo_financiero);
                    }
                    if (detalle[index].detalle) {
                        structuracamposdetalle = structuracamposdetalle + "detalle = ?, ";
                        arrayCamposdetalle.push(detalle[index].detalle);
                    }
                    if (detalle[index].id_herramienta_finaanciera) {
                        structuracamposdetalle = structuracamposdetalle + "id_herramienta_finaanciera = ?, ";
                        arrayCamposdetalle.push(detalle[index].id_herramienta_finaanciera);
                    }
                    if (arrayCamposdetalle.length > 0 && detalle[index].id) {
                        structuracamposdetalle = structuracamposdetalle.substring(0, (structuracamposdetalle.length - 2)) + " WHERE id = ? AND estado = 1;";
                        arrayCamposdetalle.push(detalle[index].id);
                        await connect.execute(`UPDATE agrotec.detalle_herramienta_financiera SET ${structuracamposdetalle}`, arrayCamposdetalle);
                    }
                }
            }
            respuesta = {
                code: 200,
                status: true,
                message: "Herramienta financiera actualizada correctamente"
            }
        } else {
            let aux = false;
            if (detalle) {
                for (let index = 0; index < detalle.length; index++) {
                    let structuracamposdetalle = "", arrayCamposdetalle = [];
                    if (detalle[index].id_catalogo_financiero) {
                        structuracamposdetalle = structuracamposdetalle + "id_catalogo_financiero = ?, ";
                        arrayCamposdetalle.push(detalle[index].id_catalogo_financiero);
                    }
                    if (detalle[index].detalle) {
                        structuracamposdetalle = structuracamposdetalle + "detalle = ?, ";
                        arrayCamposdetalle.push(detalle[index].detalle);
                    }
                    if (detalle[index].id_herramienta_finaanciera) {
                        structuracamposdetalle = structuracamposdetalle + "id_herramienta_finaanciera = ?, ";
                        arrayCamposdetalle.push(detalle[index].id_herramienta_finaanciera);
                    }
                    if (arrayCamposdetalle.length > 0 && detalle[index].id) {
                        aux = true;
                        structuracamposdetalle = structuracamposdetalle.substring(0, (structuracamposdetalle.length - 2)) + " WHERE id = ? AND estado = 1;";
                        arrayCamposdetalle.push(detalle[index].id);
                        await connect.execute(`UPDATE agrotec.detalle_herramienta_financiera SET ${structuracamposdetalle}`, arrayCamposdetalle);
                    }

                }
            }
            if (aux) {
                respuesta = {
                    code: 200,
                    status: true,
                    message: "Herramienta financiera actualizada correctamente"
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
            message: "Sucedio un error al actualizar la herramienta financiera",
            error
        }
    }
    return respuesta;
};

//Función para eliminar
const deleteHerramientaFinanciera = async (id) => {
    const [result] = await connect.execute(`UPDATE agrotec.herramienta_financiera SET estado = 0 WHERE id = ?;`, [id]);
    return result;
};

module.exports = {
    insertHerramientaFinanciera,
    getHerramientasFinancieras,
    getHerramientaFinanciera,
    getHerramientasFinancierasByUser,
    updateHerramientaFinanciera,
    deleteHerramientaFinanciera
}; // exportar los modulos