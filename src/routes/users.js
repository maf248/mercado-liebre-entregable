// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Middleware's ************
const registerValidate = require('../middlewares/registerValidate');
const loginValidate = require('../middlewares/loginValidate');
const routesMiddleware = require('../middlewares/routesMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register);
router.post('/register', registerValidate, usersController.create)

router.get('/login', usersController.login);
router.post('/login', loginValidate, usersController.authenticate);
router.post('/logout', usersController.logout);

router.get('/profile', routesMiddleware, usersController.profile);

module.exports = router;
