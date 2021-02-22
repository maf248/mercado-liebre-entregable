
function routesMiddleware(req, res, next) {
    if (req.cookies.remember == undefined && req.session.user == undefined) {
        res.redirect('/users/login')
    } else {
        next ();
    }

}

module.exports = routesMiddleware;