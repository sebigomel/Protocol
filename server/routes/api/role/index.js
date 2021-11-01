const passport = require("passport");
const RoleCtr = require("../../../controllers/role");

module.exports = (app, path) => {
  app.get(path + "/:workspaceId", passport.authenticate("jwt", { session: false }), RoleCtr.get);
  app.post(path, passport.authenticate("jwt", { session: false }), RoleCtr.create);
};
