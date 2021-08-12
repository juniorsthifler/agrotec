const connect = require('../config/database/mysql.connect');//Exportar la conexión mysql


//Función para Insertar
const insertRol = async (data) => {
  let img = data.img ? +"/static/img/config/roles/" + data.img : "/static/img/config/roles/default.png";
  const [result] = await connect.execute(
    `INSERT INTO agrotec.rol (rol, descripcion, img) VALUES (?, ?, ?); `,
    [
      data.rol,
      data.descripcion,
      img
    ]
  );
  return result;
};

//Función para Obtener todos los datos
const getRoles = async () => {
  const [result] = await connect.execute(`SELECT * FROM agrotec.rol  WHERE estado = 1;`);
  return result;
};

//Función para obtenr datos especificos
const getRol = async (id) => {
  const [result] = await connect.execute(`SELECT * FROM agrotec.rol  WHERE id=? AND estado = 1;`, [id]);
  return result;
};

//Función para actualizar
const updateRol = async (body) => {
  let respuesta = null;
  try {
    const {
      id,
      rol,
      descripcion,
      img
    } = body;
    let imagen = img ? +"/static/img/config/roles/" + img : "/static/img/config/roles/default.png";
    let structuracampos = "", arrayCampos = [];
    if (rol) {
      structuracampos = structuracampos + "rol = ?, ";
      arrayCampos.push(rol);
    }
    if (descripcion) {
      structuracampos = structuracampos + "descripcion = ?, ";
      arrayCampos.push(descripcion);
    }
    if (img) {
      structuracampos = structuracampos + "img = ?, ";
      arrayCampos.push(imagen);
    }
    if (arrayCampos.length > 0) {
      structuracampos = structuracampos.substring(0, (structuracampos.length - 2)) + " WHERE id = ? AND estado = 1;";
      arrayCampos.push(id);
      await connect.execute(`UPDATE agrotec.rol SET ${structuracampos}`, arrayCampos);
      respuesta = {
        code: 200,
        status: true,
        message: "Rol actualizado correctamente"
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
      message: "Sucedio un error al actualizar el rol",
      error
    }
  }
  return respuesta;
};

//Función para eliminar
const deleteRol = async (id) => {
  const [result] = await connect.execute(`UPDATE agrotec.rol SET estado = 0 WHERE id = ?;`, [id]);
  return result;
};

module.exports = {
  insertRol,
  getRoles,
  getRol,
  updateRol,
  deleteRol
}; // exportar los modulos