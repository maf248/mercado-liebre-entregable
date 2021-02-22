const path = require('path');
const fs = require('fs');
const db = require('../db/models');

function sessionMiddleware(req, res, next) {
  /*--Primero se setea una session, en caso de no tenerla pero SI tener una cookie----*/
  if(req.cookies.remember != undefined && req.session.user == undefined) {
        db.User.findOne({
        /*---Se usa un hashId para que nunca cambie, y sea mas segura la cookie---*/
          where: {
            email: req.cookies.remember
          }
        }).then(user => {
          return req.session.user = user
        }).catch(err => {
            console.log(error);
            res.render('error');
        })
  }
  /*--Luego se guarda la variable locals, partiendo de la session ya abierta o generada mediante la cookie--*/
  if (req.session.user != undefined) {

    res.locals.user = req.session.user;

  }

next ();
}

module.exports = sessionMiddleware;