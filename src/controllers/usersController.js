const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');

const controller = {
	register: (req, res) => {
		res.render('./users/register')
	},
	login: (req, res) => {
		res.render('./users/login')
	},
    profile: (req, res) => {
		res.render('./users/profile')
	},
};

module.exports = controller;
