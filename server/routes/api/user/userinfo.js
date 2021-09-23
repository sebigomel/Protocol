const passport = require('passport');
const User = require('../../../models/userModel')

module.exports = (app, path) => {
    app.get(path, passport.authenticate('jwt', { session: false }),  (req, res) => {
        res.send('authorized')
    })
}

