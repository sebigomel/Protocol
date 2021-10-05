const passport = require('passport');
const {createWorkspace, getWorkspaces} = require('../../../controllers/workspace');

module.exports = (app, path) => {
    app.post(path, passport.authenticate('jwt', { session: false }), createWorkspace);
    app.get(path, passport.authenticate('jwt', { session:false}), getWorkspaces);
}
