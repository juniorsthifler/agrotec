const modelTransaccion = require('../model/transaccion.model');//Importo el modelo

//Función proxi para insertar
const insertTransaccion = async (body) => {
    const result = await modelTransaccion.insertTransaccion(body);//Llamar la funcion insertar del modelo
    return result;
};

//Función proxi para obtener todos los datos
const getTransacciones = async () => {
    const result = await modelTransaccion.getTransacciones();//Llamr la función obtener todos los datos del modelo 
    return result;
};

//Función proxi para obtener datos especificos
const getTransaccion = async (id) => {
    const result = await modelTransaccion.getTransaccion(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para obtener datos especificos de herramientas financieras por usuario
const getTransaccionesByUser = async (dni) => {
    const result = await modelTransaccion.getTransaccionesByUser(dni);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para actualizar
const updateTransaccion = async (body) => {
    const result = await modelTransaccion.updateTransaccion(body);//Llamar la función de actualizar
    return result;
};

//Función proxi para eliminar
const deleteTransaccion = async (id) => {
    const result = await modelTransaccion.deleteTransaccion(id);//Llamar la funcion de eliminar
    return result;
};

module.exports = {
    insertTransaccion,
    getTransacciones,
    getTransaccion,
    getTransaccionesByUser,
    updateTransaccion,
    deleteTransaccion
};// Exportar todas las funciones proxi