const passport = require('passport');
const getUser = require('../../../controllers/user.js')

module.exports = (app, path) => {
    app.get(path + '/:username', passport.authenticate('jwt', { session: false }), getUser)
}

