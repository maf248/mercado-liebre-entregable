const {check, body} = require('express-validator');
const db = require('../db/models');
const path = require('path');
const fs = require('fs');

module.exports = [

    check('user')
    .isEmail()
    .withMessage('Tiene que tener un formato de email válido'),
    check('user')
        .custom(async function(value, {req}) {
                let user;
                try {
                    user = await db.User.findOne({
                        where: {
                            email: req.body.user
                        }
                    });

                    if (user == null) {
                        return true;
        
                    } else if (user != null) {
                        return Promise.reject();
                    }

                } catch (error) {
                    console.log(error);
                }
                
        })
        .withMessage('El email introducido ya se encuentra registrado'),
    check('password')
        .isStrongPassword()
        .withMessage('La contraseña debe tener un mínimo de 8 caracteres, incluyendo una minúscula, una mayúscula, un número y un símbolo')

]