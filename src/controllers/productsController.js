const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll()
		.then((products) => {
			res.render('products', {products: products});
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
			res.render('detail', {product: product, toThousand: toThousand});
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
				res.render('product-create-form', {categories: categories, brands: brands});
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
		db.Product.create({
			title: req.body.name,
			description: req.body.description, 
			photo: '/images/products/' + req.file.filename,
			price: req.body.price,
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
	},

	// Update - Form to edit
	edit: (req, res) => {
		db.Product.findByPk(req.params.id)
		.then((product) => {
			res.render('product-edit-form', {productToEdit: product});
		})
		.catch(error => {
			console.log(error);
			res.render('error');
		})
		
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
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