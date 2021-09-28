const passport = require('passport');
const createWorkspace = require('../../../controllers/workspace');

module.exports = (app, path) => {
    app.get(path + '/:userId', passport.authenticate('jwt', { session: false }), createWorkspace)
}
