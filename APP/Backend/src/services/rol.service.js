const modelRol = require('../model/rol.model');//Importo el modelo

//Función proxi para insertar
const insertRol = async (body) => {
    const result = await modelRol.insertRol(body);//Llamar la funcion insertar del modelo
    return result;
};

//Función proxi para obtener todos los datos
const getRoles = async () => {
    const result = await modelRol.getRoles();//Llamr la función obtener todos los datos del modelo 
    return result;
};

//Función proxi para obtener datos especificos
const getRol = async (dni) => {
    const result = await modelRol.getRol(dni);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para actualizar
const updateRol = async (body) => {
    const result = await modelRol.updateRol(body);//Llamar la función de actualizar
    return result;
};

//Función proxi para eliminar
const deleteRol = async (dni) => {
    const result = await modelRol.deleteRol(dni);//Llamar la funcion de eliminar
    return result;
};

module.exports = {
    insertRol,
    getRoles,
    getRol,
    updateRol,
    deleteRol
};// Exportar todas las funciones proxi