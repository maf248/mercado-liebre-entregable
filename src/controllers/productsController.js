const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');
const {validationResult} = require('express-validator');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll({order: [
            ['created_at', 'DESC'],
            ['title', 'ASC'],
        ],
        attributes: ['id', 'photo', 'title', 'price', 'discount']})
		.then((products) => {
			res.render('./products/products', {products: products, toThousand: toThousand});
		})
		.catch(error => {
			console.log(error);
			res.render('error');
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		db.Product.findByPk(req.params.id)
		.then((product) => {
			var finalPrice = product.price - product.price / 100 * product.discount;
			
			finalPrice = finalPrice.toFixed(2).toString()
			finalPrice = finalPrice.replace('.', ',');
			
			finalPrice = toThousand(finalPrice);
			res.render('./products/detail', {product: product, toThousand: toThousand, finalPrice: finalPrice});
		})
		.catch(error => {
			console.log(error);
			res.render('error');
		})
	},

	// Create - Form to create
	create: (req, res) => {
		db.Category.findAll()
		.then((categories) => {
				db.Brand.findAll()
			.then((brands) => {
				res.render('./products/product-create-form', {categories: categories, brands: brands});
			})
			.catch(error => {
				console.log(error);
				res.render('error');
			})
		})
		.catch(error => {
			console.log(error);
			res.render('error');
		})
		
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req);
		 /*---Se chequean los inputs. Si no hay errores los guarda---*/
		if (errors.isEmpty()) {
            /*---Si NO hay errores en los campos, guarda todo y redirije a detalle del producto---*/
			db.Product.create({
				title: req.body.name,
				description: req.body.description, 
				photo: '/images/products/' + req.file.filename,
				price: req.body.price,
				stock: req.body.stock,
				discount: req.body.discount,
				category_id: req.body.category,
				brand_id: req.body.brand			
			})
			.then(newProduct => {
				res.redirect('/products/' + newProduct.id);
			})
			.catch(error => {
				console.log(error);
				res.render('error');
			})
		} else {

			db.Category.findAll()
			.then((categories) => {
				db.Brand.findAll()
				.then((brands) => {
					
					return res.render('./products/product-create-form', {errors: errors.errors, body: req.body, categories: categories, brands: brands});
				})
				.catch(error => {
				console.log(error);
				res.render('error');
				})
			})
			.catch(error => {
			console.log(error);
			res.render('error');
			})
			
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		db.Product.findByPk(req.params.id)
		.then((product) => {
			db.Category.findAll()
			.then((categories) => {
					db.Brand.findAll()
					.then((brands) => {
					res.render('./products/product-edit-form', {productToEdit: product, categories: categories, brands: brands});
					})
					.catch(error => {
					console.log(error);
					res.render('error');
					})
		})
			.catch(error => {
			console.log(error);
			res.render('error');
			})

		})
		.catch(error => {
			console.log(error);
			res.render('error');
		})
		
	},
	// Update - Method to update
	update: (req, res) => {
		let errors = validationResult(req);
		 /*---Se chequean los inputs. Si no hay errores los guarda---*/
		if (errors.isEmpty()) {
			if (req.file) {
				db.Product.update({
					title: req.body.name,
					description: req.body.description, 
					photo: '/images/products/' + req.file.filename,
					stock: req.body.stock,
					discount: req.body.discount,
					price: req.body.price,
					brand_id: req.body.brand
				}, { where: {id: req.params.id} })
				.then(updatedProduct => {
					res.redirect('/products/' + req.params.id);
				})
				.catch(error => {
					console.log(error);
					res.render('error');
				})
			} else {
				db.Product.update({
					title: req.body.name,
					description: req.body.description,
					stock: req.body.stock,
					discount: req.body.discount,
					price: req.body.price,
					brand_id: req.body.brand
				}, { where: {id: req.params.id} })
				.then(updatedProduct => {
					res.redirect('/products/' + req.params.id);
				})
				.catch(error => {
					console.log(error);
					res.render('error');
				})
			}
		} else {
			db.Product.findByPk(req.params.id)
			.then((product) => {
				db.Category.findAll()
				.then((categories) => {
						db.Brand.findAll()
						.then((brands) => {
						res.render('./products/product-edit-form', {productToEdit: product, errors: errors.errors, body: req.body, categories: categories, brands: brands});
						})
						.catch(error => {
						console.log(error);
						res.render('error');
						})
				})
				.catch(error => {
				console.log(error);
				res.render('error');
				})

			})
			.catch(error => {
			console.log(error);
			res.render('error');
		})
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(
                res.redirect('/products')
        )
		.catch(error => {
			console.log(error);
			res.render('error');
		})
	}
};

module.exports = controller;