const modelHerramientaFinanciera = require('../model/herramienta_financiera.model');//Importo el modelo

//Función proxi para insertar
const insertHerramientaFinanciera = async (body) => {
    const result = await modelHerramientaFinanciera.insertHerramientaFinanciera(body);//Llamar la funcion insertar del modelo
    return result;
};

//Función proxi para obtener todos los datos
const getHerramientasFinancieras = async () => {
    const result = await modelHerramientaFinanciera.getHerramientasFinancieras();//Llamr la función obtener todos los datos del modelo 
    return result;
};

//Función proxi para obtener datos especificos
const getHerramientaFinanciera = async (id) => {
    const result = await modelHerramientaFinanciera.getHerramientaFinanciera(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para obtener datos especificos de herramientas financieras por usuario
const getHerramientasFinancierasByUser = async (dni) => {
    const result = await modelHerramientaFinanciera.getHerramientasFinancierasByUser(dni);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para actualizar
const updateHerramientaFinanciera = async (body) => {
    const result = await modelHerramientaFinanciera.updateHerramientaFinanciera(body);//Llamar la función de actualizar
    return result;
};

//Función proxi para eliminar
const deleteHerramientaFinanciera = async (id) => {
    const result = await modelHerramientaFinanciera.deleteHerramientaFinanciera(id);//Llamar la funcion de eliminar
    return result;
};

module.exports = {
    insertHerramientaFinanciera,
    getHerramientasFinancieras,
    getHerramientaFinanciera,
    getHerramientasFinancierasByUser,
    updateHerramientaFinanciera,
    deleteHerramientaFinanciera
};// Exportar todas las funciones proxi