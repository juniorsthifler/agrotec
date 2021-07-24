const connect = require('../config/database/mysql.connect');


const insertUser = async (data) => {
  let imagen = data.img ? +"/static/img/users/" + data.img : "/static/img/users/default.png";
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
      data.password,
      data.direction
    ]
  );
  let id_insercion = result.insertId;
  await connect.execute(
    `INSERT INTO agrotec.user (id_rol, id_person) VALUES (?, ?); `,
    [
      data.id_rol,
      id_insercion
    ]
  );
  return result;
};

const getUsers = async () => {
  const [result] = await connect.execute(`SELECT * FROM agrotec.person WHERE estado = 1;`);
  return result;
};

const getUser = async (dni) => {
  const [result] = await connect.execute(`SELECT * FROM agrotec.person  WHERE dni=? AND estado = 1;`, [dni]);
  return result;
};

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

const deleteUser = async (dni) => {
  const [result] = await connect.execute(`UPDATE agrotec.person SET estado = 0 WHERE dni = ?;`, [dni]);
  return result;
};

module.exports = {
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};