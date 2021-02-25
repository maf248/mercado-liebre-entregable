const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../db/models');

const controller = {
	index: (req, res) => {
		db.Product.findAll()
		.then((products) => {
			res.render('index', {products: products, toThousand: toThousand});
		})
        .catch(error => {
            console.log(error);
            res.render('error');
        })
	},
	search: (req, res) => {
		res.render('results')
	},
    avatarShow: (req, res) => {

        if (req.session.user != undefined) {
           
            res.render('./users/avatar');

            } else {
            res.redirect('/users/login')
        }
    
    },
	avatarChange: (req, res) => {
		/*---Aqui se guarda el nombre del archivo del nuevo avatar---*/
		
        db.User.update({
            avatar: req.files[0].filename
        }, {
            where: {
                id: {[db.Sequelize.Op.like] : [req.session.user.id]}
            }
        }).then(() => {
            db.User.findByPk(req.session.user.id)
            .then(user => {
                req.session.user = user;
                res.redirect('/users/profile');
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
};

module.exports = controller;
