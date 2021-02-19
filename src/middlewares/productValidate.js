const {check, body} = require('express-validator');
const db = require('../db/models');
const path = require('path');
const fs = require('fs');

module.exports = [

    check('name')
    .isLength({min:3, max: 100})
    .withMessage('Este campo debe contener entre 3 y 100 caracteres'),
    check('price')
    .isFloat({min: 1})
    .withMessage('El precio debe ser mayor a 0'),
    check('brand')
    .isNumeric()
    .withMessage('Por favor selecciona una marca de la lista'),
    check('description')
    .isLength({max:1000})
    .withMessage('Has superado el máximo de 1.000 caracteres'),
    body('productImage')
    .custom(function(value, {req}) {
        if (typeof req.file != 'undefined') {

            var extension = (path.extname(req.file.filename)).toLowerCase();
            switch (extension) {
            case '.jpg':
                return true;
            case '.jpeg':
                return true;
            case  '.png':
                return true;
            default:
                return false;
            }

        }
        return false;
    })
    .withMessage('Debes subir una imagen del producto (formatos permitidos: .jpg .jpeg .png)')
    
]