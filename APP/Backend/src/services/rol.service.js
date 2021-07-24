const modelRol = require('../model/rol.model');

const insertRol = async (body) => {
    const result = await modelRol.insertRol(body);
    return result;
};

const getRoles = async () => {
    const result = await modelRol.getRoles();
    return result;
};

const getRol = async (dni) => {
    const result = await modelRol.getRol(dni);
    return result;
};


const updateRol = async (body) => {
    const result = await modelRol.updateRol(body);
    return result;
};

const deleteRol = async (dni) => {
    const result = await modelRol.deleteRol(dni);
    return result;
};

module.exports = {
    insertRol,
    getRoles,
    getRol,
    updateRol,
    deleteRol
};