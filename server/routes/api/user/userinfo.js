const passport = require('passport');
const UserCtr = require('../../../controllers/user.js')

module.exports = (app, path) => {
    app.get(path, passport.authenticate('jwt', { session: false }), UserCtr.get)
}

