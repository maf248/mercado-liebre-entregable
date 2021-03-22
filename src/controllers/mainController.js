const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const url = require('url');
const querystring = require('querystring');

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

        let rawUrl = req.url;
        let parsedUrl = url.parse(rawUrl);
        let parsedQs = querystring.parse(parsedUrl.query);

        db.Product.findAll({where: {
            title: {[db.Sequelize.Op.like]: `%${parsedQs.keywords}%`}
        }})
		.then((products) => {
			res.render('results', {products: products, toThousand: toThousand});
		})
        .catch(error => {
            console.log(error);
            res.render('error');
        })
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
