// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ************ Middleware's ************
const routesMiddleware = require('../middlewares/routesMiddleware');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    let dirImage = path.join('public', 'images', 'users');
    if (!fs.existsSync(dirImage)) {
        return fs.mkdir(dirImage, error => cb(error, dirImage))
        }
     return cb(null, dirImage);
    },
    filename: function(req, file, cb) {
           
     return cb(null, 'Usuario-' + req.session.user.id + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

// ************ Main Routes ************

router.get('/', mainController.index);

router.get('/avatar/upload', routesMiddleware, mainController.avatarShow);
router.post('/avatar/upload', upload.any(), mainController.avatarChange);

router.get('/search', mainController.search); 

module.exports = router;
