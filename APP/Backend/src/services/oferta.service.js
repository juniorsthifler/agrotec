const modelOferta = require('../model/oferta.model');//Importo el modelo

//Función proxi para insertar
const insertOferta = async (body) => {
    const result = await modelOferta.insertOferta(body);//Llamar la funcion insertar del modelo
    return result;
};

//Función proxi para obtener todos los datos
const getOfertas = async () => {
    const result = await modelOferta.getOfertas();//Llamr la función obtener todos los datos del modelo 
    return result;
};

//Función proxi para obtener datos especificos
const getOferta = async (id) => {
    const result = await modelOferta.getOferta(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para obtener las ofertas de un usuario
const getOfertasByUser = async (id) => {
    const result = await modelOferta.getOfertasByUser(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para obtener las ofertas de un producto
const getOfertasByProducto = async (id) => {
    const result = await modelOferta.getOfertasByProducto(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para actualizar
const updateOferta = async (body) => {
    const result = await modelOferta.updateOferta(body);//Llamar la función de actualizar
    return result;
};

//Función proxi para eliminar
const deleteOferta = async (id) => {
    const result = await modelOferta.deleteOferta(id);//Llamar la funcion de eliminar
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
};// Exportar todas las funciones proxi