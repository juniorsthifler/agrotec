const modelUser = require('../model/user.model');

const insertUser = async (body, auxrol) => {
  const result = await modelUser.insertUser(body);
  return result;
};

const getUsers = async () => {
  const result = await modelUser.getUsers();
  return result;
};

const getUser = async (id) => {
  const result = await modelUser.getUser(id);
  return result;
};


const updateUser = async (body) => {
  const result = await modelUser.updateUser(body);
  return result;
};

const deleteUser = async (id) => {
  const result = await modelUser.deleteUser(id);
  return result;
};

module.exports = {
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};