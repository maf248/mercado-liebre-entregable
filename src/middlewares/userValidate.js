const {check, body} = require('express-validator');
const db = require('../db/models');
const path = require('path');
const fs = require('fs');

module.exports = [

    check('user')
    .isEmail()
    .withMessage('Tiene que tener un formato de email válido'),
    check('password')
    .isLength({min:6, max: 9})
    .withMessage('La contraseña debe contener entre 6 y 9 caracteres')

]