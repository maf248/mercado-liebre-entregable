const path = require('path');
const fs = require('fs');
const db = require('../db/models');

function sessionMiddleware(req, res, next) {
  /*---En caso de tener una cookie pero no session abierta, abre esta última----*/
  if(req.cookies.remember != undefined && req.session.user == undefined) {
        db.User.findOne({
          where: {
            email: req.cookies.remember
          }
        }).then(user => {
          return req.session.user = user;
        }).catch(err => {
            console.log(error);
            res.render('error');
        })
  }
  /*---Se guarda una variable local, a partir de la session existente o recien creada a partir de la cookie---*/
  if (req.session.user != undefined) {

    res.locals.user = req.session.user;

  }

next ();
}

module.exports = sessionMiddleware;