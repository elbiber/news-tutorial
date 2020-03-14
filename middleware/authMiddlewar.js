const auth = (req, res, next) => {
    if (req.session && req.session.isLoggedIn === true) {
        console.log('User is logged in')
        next()
    } else {
        console.log('User is not logged in')
        res.status(401)
        res.render('not-authorized')
    }
}

module.exports = auth
