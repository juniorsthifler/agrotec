const { createPool } = require('mysql2/promise');
const config = require('./../enviroment');
const connect = createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
});

connect
  .getConnection()
  .then((conn) => {
    const res = conn.query('SELECT 1');
    conn.release();
    //logger.info('MYSQL connection established.');
    console.log('Conexión MYSQL estalecida exitosamente.');
    return res;
  })
  .catch((err) => {
    if (err.code === 'ENOTFOUND') {
      console.error(
        `Nombre incorrecto del Servidor de la Base de Datos ${process.env.DB_MYSQL_NAME}.`
      );
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error(
        `Usuario o Contraseña de la Base de Datos ${process.env.DB_MYSQL_NAME} incorrectos.`
      );
    }
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.table(
        [
          {
            database: 'mysql',
            status_connection: 'error',
            info: 'Nombre de DB incorrecto',
          },
        ],
        ['database', 'status_connection', 'info']
      );
      console.error(
        `Nombre de la Base de Datos ${process.env.DB_MYSQL_NAME} incorrecto.`
      );
    }
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error(
        `Se ha cerrado la conexión con la Base de Datos ${process.env.DB_MYSQL_NAME}.`
      );
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error(
        `La Base de Datos ${process.env.DB_MYSQL_NAME} posee muchas conexiones.`
      );
    }
    if (err.code === 'ECONNREFUSED') {
      console.error(
        `La conexión a la Base de Datos ${process.env.DB_MYSQL_NAME} ha sido rechazada.`
      );
    }
    // Temporal
    console.log(err);
  });

module.exports = connect;
