// ************ Require's ************
const express = require('express');
const router = express.Router();

const userValidate = require('../middlewares/userValidate')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register);
router.post('/register', userValidate, usersController.create)

router.get('/login', usersController.login);
router.post('/login', usersController.authenticate);

router.get('/profile', usersController.profile);

module.exports = router;
