const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const session = require('express-session');


const controller = {
	register: (req, res) => {
		res.render('./users/register');
	},
    create: (req, res) => {
        let errors = validationResult(req);
		 /*---Se chequean los inputs. Si no hay errores los guarda---*/
		if (errors.isEmpty()) {
            /*---Si NO hay errores en los campos, guarda todo y redirije a detalle del producto---*/
			db.User.create({
				email: req.body.user,
				password: bcryptjs.hashSync(req.body.password, 10)	
			})
			.then(newUser => {

				res.redirect('/users/login');
			})
			.catch(error => {
				console.log(error);
				res.render('error');
			})
		} else {

			res.render('./users/register', {errors: errors.errors, mail: req.body.user});
			
		}
    },
	login: (req, res) => {
		res.render('./users/login');
	},
    profile: (req, res) => {
		res.render('./users/profile');
	},
};

module.exports = controller;
