const modelUser = require('../model/user.model');//Importo el modelo

//Función proxi para insertar
const insertUser = async (body) => {
  const result = await modelUser.insertUser(body);//Llamar la funcion insertar del modelo
  return result;
};

//Función proxi para obtener todos los datos
const getUsers = async () => {
  const result = await modelUser.getUsers();//Llamr la función obtener todos los datos del modelo 
  return result;
};

//Función proxi para obtener datos especificos
const getUser = async (id) => {
  const result = await modelUser.getUser(id);//Llamar la funciom de obtener datos especificos del modelo
  return result;
};


//Función proxi para actualizar
const updateUser = async (body) => {
  const result = await modelUser.updateUser(body);//Llamar la función de actualizar
  return result;
};

//Función proxi para eliminar
const deleteUser = async (id) => {
  const result = await modelUser.deleteUser(id);//Llamar la funcion de eliminar
  return result;
};

//Función proxi para agregar roles
const addRol = async (body) => {
  const result = await modelUser.addRol(body);//Llamar la funcion de agregaciónde roles del modelo
  return result;
};


//Función proxi para desactivar un rol
const disableRol = async (id) => {
  const result = await modelUser.disableRol(id);//Llamar la funcion de desactivar un rol
  return result;
};

//Función proxi para activar un rol
const enableRol = async (id) => {
  const result = await modelUser.enableRol(id);//Llamar la funcion de activar un rol
  return result;
};

//Función proxi para loguearse
const Login = async (user, password) => {
  const result = await modelUser.Login(user, password);//Llamar la funciom de obtener datos de logueo
  return result;
};

module.exports = {
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addRol,
  disableRol,
  enableRol,
  Login
};// Exportar todas las funciones proxi