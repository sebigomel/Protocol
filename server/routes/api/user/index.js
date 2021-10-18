const passport = require("passport");
const UserCtr = require("../../../controllers/user.js");

module.exports = (app, path) => {
  app.get(path, passport.authenticate("jwt", { session: false }), UserCtr.getMyInfo);
  app.get(path + '/verify/:id/:token', UserCtr.verifyEmail)
  app.put(path, passport.authenticate("jwt", { session: false }), UserCtr.update)
  app.get(path + '/:username', passport.authenticate("jwt", { session: false }), UserCtr.getOthersInfo)
};
