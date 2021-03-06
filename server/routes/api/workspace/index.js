const passport = require("passport");
const WorkspaceCtr = require("../../../controllers/workspace");

module.exports = (app, path) => {
  app.post(
    path,
    passport.authenticate("jwt", { session: false }),
    WorkspaceCtr.create
  );
  app.get(
    path,
    passport.authenticate("jwt", { session: false }),
    WorkspaceCtr.getUsers
  );
  app.get(
    path + "/getUsers/:workspaceId",
    passport.authenticate("jwt", { session: false }),
    WorkspaceCtr.getAllUsers
  );
  app.get(
    path + "/:id",
    passport.authenticate("jwt", { session: false }),
    WorkspaceCtr.getOne
  );
  app.delete(
    path + "/:id",
    passport.authenticate("jwt", { session: false }),
    WorkspaceCtr.delete
  );
  app.get(
    path + "/joinWorkspace/:workspaceId",
    passport.authenticate("jwt", { session: false }),
    WorkspaceCtr.join
  );
};
