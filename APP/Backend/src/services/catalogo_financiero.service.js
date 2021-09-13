const modelCatalogoFinanciero = require('../model/catalogo_financiero.model');//Importo el modelo

//Función proxi para insertar
const insertCatalogoFinanciero = async (body) => {
    const result = await modelCatalogoFinanciero.insertCatalogoFinanciero(body);//Llamar la funcion insertar del modelo
    return result;
};

//Función proxi para obtener todos los datos
const getCatalogosFinancieros = async () => {
    const result = await modelCatalogoFinanciero.getCatalogosFinancieros();//Llamr la función obtener todos los datos del modelo 
    return result;
};

//Función proxi para obtener datos especificos
const getCatalogoFinanciero = async (id) => {
    const result = await modelCatalogoFinanciero.getCatalogoFinanciero(id);//Llamar la funciom de obtener datos especificos del modelo
    return result;
};

//Función proxi para actualizar
const updateCatalogoFinanciero = async (body) => {
    const result = await modelCatalogoFinanciero.updateCatalogoFinanciero(body);//Llamar la función de actualizar
    return result;
};

//Función proxi para eliminar
const deleteCatalogoFinanciero = async (id) => {
    const result = await modelCatalogoFinanciero.deleteCatalogoFinanciero(id);//Llamar la funcion de eliminar
    return result;
};

module.exports = {
    insertCatalogoFinanciero,
    getCatalogosFinancieros,
    getCatalogoFinanciero,
    updateCatalogoFinanciero,
    deleteCatalogoFinanciero
};// Exportar todas las funciones proxi