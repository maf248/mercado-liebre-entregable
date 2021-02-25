// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Middleware's ************
const userValidate = require('../middlewares/userValidate');
const routesMiddleware = require('../middlewares/routesMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register);
router.post('/register', userValidate, usersController.create)

router.get('/login', usersController.login);
router.post('/login', usersController.authenticate);

router.get('/profile', routesMiddleware, usersController.profile);

module.exports = router;
