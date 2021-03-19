const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const session = require('express-session');


const controller = {
	register: (req, res) => {
        if (req.session.user == undefined) {
		    res.render('./users/register');
        } else {
            res.redirect('/users/profile');
        }
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
			})

		} else {

			res.render('./users/register', {errors: errors.errors, mail: req.body.user});
			
		}
    },
	login: (req, res) => {
        if (req.session.user == undefined) {
            res.render('./users/login', {wrongPassword: null, wrongEmail: null});
        } else {
            res.redirect('/users/profile');
        }
		
	},
    authenticate: (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.user
            }
        }).then((user) => {
                if (user != null) {
                    var check = bcryptjs.compareSync(req.body.password, user.password);
                        if (check) {

                            req.session.user = user;
                            res.locals.user = req.session.user;
                            
                            if(req.body.remember != undefined ) {
                                res.cookie('remember', user.email, {maxAge: 1000*60*60*10})
                            } 
                            return res.redirect('/users/profile');
                                                
                        } else if (!check) {
                            
                            return res.render('./users/login', {wrongPassword: true, wrongEmail: null, email: req.body.user});
                        }     
                } else {
        
                    return res.render('./users/login', {wrongPassword: null, wrongEmail: true, email: req.body.user});
                }
            })
            .catch((err) => {
                console.log(error);
				res.render('error');
            })
    },
    profile: (req, res) => {
		if (req.session.user != undefined) {
            
            db.User.findByPk(req.session.user.id)
            .then(user => { 
                  res.render('./users/profile', {user: user});
                })

            } else {
            res.redirect('/users/login')
        }
	}
};

module.exports = controller;
