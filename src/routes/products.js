// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Middleware's ************
const productValidate = require('../middlewares/productValidate');
const routesMiddleware = require('../middlewares/routesMiddleware');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
     return cb(null, 'public/images/products');
    },
    filename: function(req, file, cb) {
     return cb(null, 'producto' + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', routesMiddleware, productsController.create); 
router.post('/create', upload.single('productImage'), productValidate, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', routesMiddleware, productsController.edit); 
router.patch('/edit/:id', upload.single('productImage'), productValidate, productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', routesMiddleware, productsController.destroy); 


module.exports = router;
