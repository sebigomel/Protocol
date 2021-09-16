const passport = require('passport')

let authenticateUser = async (req, res) => {

    username = req.body.username;
    password = req.body.password;

    await passport.authenticate('local', { successRedirect: '/api',
    failureRedirect: '/users',
    failureFlash: true })
}

module.exports = authenticateUser;