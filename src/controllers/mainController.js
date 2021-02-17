const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');

const controller = {
	index: (req, res) => {
		db.Product.findAll()
		.then((products) => {
			res.render('index', {products: products});
		})
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
