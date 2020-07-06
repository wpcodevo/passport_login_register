module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log('User logged in successfully')
            return next();
        }
        req.flash('error_msg', 'Please login to view this resource');
        res.redirect('/users/login');
        console.log('User can\'t login in')
    },
    forwardAuth: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/dashboard')
        }
    }
}