const modelProducto = require('../model/producto.model');//Importo el modelo

//Función proxi para insertar
const insertProducto = async (body) => {
    const result = await modelProducto.insertProducto(body);//Llamar la funcion insertar del modelo
    return result;
};

//Función proxi para obtener todos los datos
const getProductos = async () => {
    const result = await modelProducto.getProductos();//Llamr la función obtener todos los datos del modelo 
    return result;
};

//Función proxi para obtener datos especificos
const getProducto = async (id) => {
    const result = await modelProducto.getProducto(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para obtener los productos de un usuario
const getProductosByUser = async (id) => {
    const result = await modelProducto.getProductosByUser(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para actualizar
const updateProducto = async (body) => {
    const result = await modelProducto.updateProducto(body);//Llamar la función de actualizar
    return result;
};

//Función proxi para eliminar
const deleteProducto = async (id) => {
    const result = await modelProducto.deleteProducto(id);//Llamar la funcion de eliminar
    return result;
};

module.exports = {
    insertProducto,
    getProductos,
    getProducto,
    getProductosByUser,
    updateProducto,
    deleteProducto
};// Exportar todas las funciones proxi