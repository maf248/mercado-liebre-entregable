require('dotenv').config()
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASSWORD_DB,
    "database": "mercado_liebre_entregable",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.PORT_DB
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
