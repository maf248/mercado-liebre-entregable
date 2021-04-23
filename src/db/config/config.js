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
    "username": "be2ceb2e6508ee",
    "password": "f7f9fabc",
    "database": "heroku_ef71bdbc53096bb",
    "host": "us-cdbr-east-03.cleardb.com",
    "dialect": "mysql"
  }
}
