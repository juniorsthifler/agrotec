const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql


//Función para Insertar
const insertOferta = async (data) => {
    const [result] = await connect.execute(
        `INSERT INTO agrotec.oferta (
            id,
            img,
            descripcion,
            cantidad,
            unidad_medida,
            precio_normal,
            precio_oferta,
            campo_precio_habilitado,
            caducidad,
            id_producto
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `,
        [
            data.id,
            data.img,
            data.descripcion,
            data.cantidad,
            data.unidad_medida,
            data.precio_normal,
            data.precio_oferta,
            data.campo_precio_habilitado,
            data.caducidad,
            data.id_producto
        ]
    );
    return result;
};

//Función para Obtener todos los datos
const getOfertas = async () => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.oferta  WHERE estado = 1;`);
    return result;
};

//Función para obtenr datos especificos
const getOferta = async (id) => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.oferta  WHERE id=? AND estado = 1;`, [id]);
    return result;
};

//Función para obtenr datos especificos
const getOfertasByUser = async (id) => {
    const [result] = await connect.execute(`SELECT oferta.*
    FROM agrotec.oferta oferta, agrotec.producto producto  WHERE oferta.estado = 1 AND producto.estado = 1 AND producto.id = oferta.id_producto AND producto.id_user_ofertante=?;`, [id]);
    return result;
};

//Función para obtenr datos especificos
const getOfertasByProducto = async (id) => {
    const [result] = await connect.execute(`SELECT * FROM agrotec.oferta  WHERE id_producto=? AND estado = 1;`, [id]);
    return result;
};


//Función para actualizar
const updateOferta = async (body) => {
    let respuesta = null;
    try {
        const {
            id,
            img,
            descripcion,
            cantidad,
            unidad_medida,
            precio_normal,
            precio_oferta,
            campo_precio_habilitado,
            caducidad,
            id_producto
        } = body;
        let structuracampos = "", arrayCampos = [];
        if (img) {
            structuracampos = structuracampos + "img = ?, ";
            arrayCampos.push(img);
        }
        if (descripcion) {
            structuracampos = structuracampos + "descripcion = ?, ";
            arrayCampos.push(descripcion);
        }
        if (cantidad) {
            structuracampos = structuracampos + "cantidad = ?, ";
            arrayCampos.push(cantidad);
        }
        if (unidad_medida) {
            structuracampos = structuracampos + "unidad_medida = ?, ";
            arrayCampos.push(unidad_medida);
        }
        if (precio_normal) {
            structuracampos = structuracampos + "precio_normal = ?, ";
            arrayCampos.push(precio_normal);
        }
        if (precio_oferta) {
            structuracampos = structuracampos + "precio_oferta = ?, ";
            arrayCampos.push(precio_oferta);
        }
        if (campo_precio_habilitado) {
            structuracampos = structuracampos + "campo_precio_habilitado = ?, ";
            arrayCampos.push(campo_precio_habilitado);
        }
        if (caducidad) {
            structuracampos = structuracampos + "caducidad = ?, ";
            arrayCampos.push(caducidad);
        }
        if (id_producto) {
            structuracampos = structuracampos + "id_producto = ?, ";
            arrayCampos.push(id_producto);
        }
        if (arrayCampos.length > 0) {
            structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE id = ? AND estado = 1;";
            arrayCampos.push(id);
            await connect.execute(`UPDATE agrotec.oferta SET ${structuracampos}`, arrayCampos);
            respuesta = {
                code: 200,
                status: true,
                message: "Oferta actualizada correctamente"
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
            message: "Sucedio un error al actualizar la oferta",
            error
        }
    }
    return respuesta;
};

//Función para eliminar
const deleteOferta = async (id) => {
    const [result] = await connect.execute(`UPDATE agrotec.oferta SET estado = 0 WHERE id = ?;`, [id]);
    return result;
};

module.exports = {
    insertOferta,
    getOfertas,
    getOferta,
    getOfertasByUser,
    getOfertasByProducto,
    updateOferta,
    deleteOferta
}; // exportar los modulos