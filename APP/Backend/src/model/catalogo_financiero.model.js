const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql


//Función para Insertar
const insertCatalogoFinanciero = async (data) => {
    const [result] = await connect.execute(
        `INSERT INTO agrotec.catalogo_financiero (nombre, descripcion, tipo_dato_primitive) VALUES (?, ?, ?); `,
        [
            data.nombre,
            data.descripcion,
            data.tipo_dato_primitive
        ]
    );
    return result;
};

//Función para Obtener todos los datos
const getCatalogosFinancieros = async () => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.catalogo_financiero  WHERE estado = 1;`);
    return result;
};

//Función para obtenr datos especificos
const getCatalogoFinanciero = async (id) => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.catalogo_financiero  WHERE id=? AND estado = 1;`, [id]);
    return result;
};

//Función para actualizar
const updateCatalogoFinanciero = async (body) => {
    let respuesta = null;
    try {
        const {
            id,
            nombre,
            descripcion,
            tipo_dato_primitive
        } = body;
        let structuracampos = "", arrayCampos = [];
        if (nombre) {
            structuracampos = structuracampos + "nombre = ?, ";
            arrayCampos.push(nombre);
        }
        if (descripcion) {
            structuracampos = structuracampos + "descripcion = ?, ";
            arrayCampos.push(descripcion);
        }
        if (tipo_dato_primitive) {
            structuracampos = structuracampos + "tipo_dato_primitive = ?, ";
            arrayCampos.push(tipo_dato_primitive);
        }
        if (arrayCampos.length > 0) {
            structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE id = ? AND estado = 1;";
            arrayCampos.push(id);
            await connect.execute(`UPDATE agrotec.catalogo_financiero SET ${structuracampos}`, arrayCampos);
            respuesta = {
                code: 200,
                status: true,
                message: "Catalogo financiero actualizado correctamente"
            }

        } else {
            respuesta = {
                code: 400,
                status: false,
                message: "No existen datos para actualizar"
            }
        }
    } catch (error) {
        respuesta = {
            code: 400,
            status: false,
            message: "Sucedio un error al actualizar el catalogo financiero",
            error
        }
    }
    return respuesta;
};

//Función para eliminar
const deleteCatalogoFinanciero = async (id) => {
    const [result] = await connect.execute(`UPDATE agrotec.catalogo_financiero SET estado = 0 WHERE id = ?;`, [id]);
    return result;
};

module.exports = {
    insertCatalogoFinanciero,
    getCatalogosFinancieros,
    getCatalogoFinanciero,
    updateCatalogoFinanciero,
    deleteCatalogoFinanciero
}; // exportar los modulos