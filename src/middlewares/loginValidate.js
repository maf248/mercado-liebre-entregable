const {check, body} = require('express-validator');
const db = require('../db/models');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

async function findUser(email) {
    let user;
    try {
        user = await db.User.findOne({
            where: {
                email: email
            }
        })
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = [
    check('user')
        .isEmail()
        .withMessage('Formato de email invalido'),
    check('user')
        .custom(async function(value, {req}) {
                
            user = await findUser(value);
                if (user == null) {
                    return Promise.reject();
        
                } else if (user != null) {
                    return true;
                }             
        })
        .withMessage('El email introducido NO se encuentra registrado'),
    body('password')
        .custom(async function(value, {req}) {
            user = await findUser(req.body.user);
            if (user == null) {
                return Promise.reject();
    
            } else if (user != null) {
                var check = bcryptjs.compareSync(req.body.password, user.password);
                if (check) {
                    return true;
                } else {
                    return Promise.reject();
                }
            }             
            
            
        })
        .withMessage('La contraseña es incorrecta')
]