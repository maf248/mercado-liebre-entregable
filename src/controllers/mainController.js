const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');

const controller = {
	index: (req, res) => {
		db.Product.findAll()
		.then((products) => {
			res.render('index', {products: products, toThousand: toThousand});
		})
	},
	search: (req, res) => {
		res.render('results')
	},
    avatarShow: (req, res) => {
        res.render('./users/avatar');
    },
	avatarChange: (req, res) => {
		/*---Aqui se guarda el nombre del archivo del nuevo avatar---*/
		
        db.User.update({
            avatar: req.files[0].filename
        }, {
            where: {
                id: {[db.Sequelize.Op.like] : [req.session.user.id]}
            }
        }).then( () => {
            res.redirect('/users/profile')
        })
	}
};

module.exports = controller;
