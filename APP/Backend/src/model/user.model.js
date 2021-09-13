const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql
const bcrypt = require('bcrypt'); //Librería para encriptar texto plano

//Función para Insertar
const insertUser = async (data) => {
  let imagen = data.img ? +"/static/img/users/" + data.img : "/static/img/users/default.png";
  let password = await bcrypt.hash(data.password, 10);
  const [result] = await connect.execute(
    `INSERT INTO agrotec.person (dni, full_name, date_birth, img, celular, email, user, password, direction) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); `,
    [
      data.dni,
      data.full_name,
      data.date_birth,
      imagen,
      data.celular,
      data.email,
      data.user,
      password,
      data.direction
    ]
  );
  //let id_insercion = result.insertId;
  await connect.execute(
    `INSERT INTO agrotec.user (id, id_rol, id_person) VALUES (?, ?, ?); `,
    [
      data.dni + "_" + data.id_rol,
      data.id_rol,
      data.dni
    ]
  );
  return result;
};

//Función para Obtener todos los datos
const getUsers = async () => {
  const [result] = await connect.execute(`SELECT 
  person.dni, person.full_name, person.date_birth , person.img, person.celular, person.email, person.user, person.password, person.direction,
  rol.id as id_rol, rol.rol
  FROM agrotec.person person, agrotec.user user, agrotec.rol rol WHERE person.estado = 1 AND user.estado = 1 AND rol.estado = 1 AND user.id_person = person.dni AND user.id_rol = rol.id;`);
  return result;
};

//Función para obtenr datos especificos
const getUser = async (dni) => {
  const [result] = await connect.execute(`SELECT 
  person.dni, person.full_name, person.date_birth , person.img, person.celular, person.email, person.user, person.password, person.direction,
  rol.id as id_rol, rol.rol
  FROM agrotec.person person, agrotec.user user, agrotec.rol rol WHERE person.estado = 1 AND user.estado = 1 AND rol.estado = 1 AND user.id_person = person.dni AND user.id_rol = rol.id AND person.dni=?;`, [dni]);
  return result;
};

//Función para actualizar
const updateUser = async (body) => {
  let respuesta = null;
  try {
    const {
      dni,
      full_name,
      date_birth,
      celular,
      email,
      direction
    } = body;
    let structuracampos = "", arrayCampos = [];
    if (full_name) {
      structuracampos = structuracampos + "full_name = ?, ";
      arrayCampos.push(full_name);
    }
    if (date_birth) {
      structuracampos = structuracampos + "date_birth = ?, ";
      arrayCampos.push(date_birth);
    }
    if (celular) {
      structuracampos = structuracampos + "celular = ?, ";
      arrayCampos.push(celular);
    }
    if (email) {
      structuracampos = structuracampos + "email = ?, ";
      arrayCampos.push(email);
    }
    if (direction) {
      structuracampos = structuracampos + " direction = ?, ";
      arrayCampos.push(direction);
    }
    if (arrayCampos.length > 0) {
      structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE dni = ? AND estado = 1;";
      arrayCampos.push(dni);
      await connect.execute(`UPDATE agrotec.person SET ${structuracampos}`, arrayCampos);
      respuesta = {
        code: 200,
        status: true,
        message: "Usuario actualizado correctamente"
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
      message: "Sucedio un error al actualizar el usuario",
      error
    }
  }
  return respuesta;
};

//Función para eliminar
const deleteUser = async (dni) => {
  const [result] = await connect.execute(`UPDATE agrotec.person SET estado = 0 WHERE dni = ?;`, [dni]);
  return result;
};


//Función para agregar roles
const addRol = async (data) => {
  const [result] = await connect.execute(
    `INSERT INTO agrotec.user (id, id_rol, id_person) VALUES (?, ?, ?); `,
    [
      data.dni + "_" + data.id_rol,
      data.id_rol,
      data.dni
    ]
  );
  return result;
};


//Función para desactivar un rol
const disableRol = async (id) => {
  const [result] = await connect.execute(`UPDATE agrotec.user SET estado = 0 WHERE id = ? AND estado = 1;`, [id]);
  return result;
};

//Función para activar un rol
const enableRol = async (id) => {
  const [result] = await connect.execute(`UPDATE agrotec.user SET estado = 1 WHERE id = ? AND estado = 0;`, [id]);
  return result;
};

//Función para loguearse
const Login = async (user, password) => {
  const [result] = await connect.execute(`SELECT 
  person.dni, person.full_name, person.date_birth , person.img, person.celular, person.email, person.user, person.password, person.direction,
  rol.id as id_rol, rol.rol
  FROM agrotec.person person, agrotec.user user, agrotec.rol rol WHERE person.estado = 1 AND user.estado = 1 AND rol.estado = 1 AND user.id_person = person.dni AND user.id_rol = rol.id AND person.user=?;`, [user]);
  if (result.length > 0) {
    if (await bcrypt.compare(password, result[0].password)) {
      return result;
    } else {
      return [];
    }
  } else {
    return []
  }
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
};