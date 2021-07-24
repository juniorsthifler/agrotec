const ambiente = process.env.NODE_ENV || 'produccion';

const configuracionBase = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    mysql: {
        host: process.env.DB_MYSQL_HOST,
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASS,
        database: process.env.DB_MYSQL_NAME,
        port: process.env.DB_MYSQL_PORT,
    },
    jwt: {}
};

let configuracionDeAmbiente = {};

switch (ambiente) {
    case 'desarrollo':
    case 'dev':
    case 'development':
        configuracionDeAmbiente = require('./dev');
        break;
    case 'produccion':
    case 'production':
    case 'prod':
        configuracionDeAmbiente = require('./prod');
        break;
    case 'test':
        configuracionDeAmbiente = require('./test');
        break;
    default:
        configuracionDeAmbiente = require('./dev');
}

module.exports = {
    ...configuracionBase,
    ...configuracionDeAmbiente
};
