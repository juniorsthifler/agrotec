const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql


//Función para Insertar
const insertProducto = async (data) => {
    const [result] = await connect.execute(
        `INSERT INTO agrotec.producto (id, nombre, stock, unidad_medida_stock, id_user_ofertante) VALUES (?, ?, ?, ?, ?); `,
        [
            data.id,
            data.nombre,
            data.stock,
            data.unidad_medida_stock,
            data.id_user_ofertante
        ]
    );
    return result;
};

//Función para Obtener todos los datos
const getProductos = async () => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.producto  WHERE estado = 1;`);
    return result;
};

//Función para obtenr datos especificos
const getProducto = async (id) => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.producto  WHERE id=? AND estado = 1;`, [id]);
    return result;
};

//Función para obtenr datos especificos
const getProductosByUser = async (id) => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.producto  WHERE id_user_ofertante=? AND estado = 1;`, [id]);
    return result;
};

//Función para actualizar
const updateProducto = async (body) => {
    let respuesta = null;
    try {
        const {
            id,
            nombre,
            stock,
            unidad_medida_stock,
            id_user_ofertante
        } = body;
        let structuracampos = "", arrayCampos = [];
        if (nombre) {
            structuracampos = structuracampos + "nombre = ?, ";
            arrayCampos.push(nombre);
        }
        if (stock) {
            structuracampos = structuracampos + "stock = ?, ";
            arrayCampos.push(stock);
        }
        if (unidad_medida_stock) {
            structuracampos = structuracampos + "unidad_medida_stock = ?, ";
            arrayCampos.push(unidad_medida_stock);
        }
        if (id_user_ofertante) {
            structuracampos = structuracampos + "id_user_ofertante = ?, ";
            arrayCampos.push(id_user_ofertante);
        }
        if (arrayCampos.length > 0) {
            structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE id = ? AND estado = 1;";
            arrayCampos.push(id);
            await connect.execute(`UPDATE agrotec.producto SET ${structuracampos}`, arrayCampos);
            respuesta = {
                code: 200,
                status: true,
                message: "Producto actualizado correctamente"
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
            message: "Sucedio un error al actualizar el producto",
            error
        }
    }
    return respuesta;
};

//Función para eliminar
const deleteProducto = async (id) => {
    const [result] = await connect.execute(`UPDATE agrotec.producto SET estado = 0 WHERE id = ?;`, [id]);
    return result;
};

module.exports = {
    insertProducto,
    getProductos,
    getProducto,
    getProductosByUser,
    updateProducto,
    deleteProducto
}; // exportar los modulos