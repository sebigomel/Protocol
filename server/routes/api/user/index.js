const passport = require("passport");
const UserCtr = require("../../../controllers/user.js");

module.exports = (app, path) => {
  app.get(path, passport.authenticate("jwt", { session: false }), UserCtr.getMyInfo);
  app.get(path + '/verify/:id/:token', UserCtr.verifyEmail)
  app.patch(path, passport.authenticate("jwt", { session: false }), UserCtr.update)
  app.get(path + '/:username', passport.authenticate("jwt", { session: false }), UserCtr.getOthersInfo)
  app.get(path + '/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}))
  app.get(path + '/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', session: false }), UserCtr.googleAuth)
};
