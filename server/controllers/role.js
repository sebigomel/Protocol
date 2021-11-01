const Role = require("../models/roleModel");
const Workspace = require("../models/workspaceModel");
const User = require("../models/userModel");

module.exports = {
  create: (req, res) => {
    const { name, workspace, devices } = req.body;
    Role.create(
      {
        name: name,
        workspace: workspace,
        devices: devices,
      },
      function (err, role) {
        if (err) return res.status(500).json(err.message);
        Workspace.findByIdAndUpdate(
          role.workspace,
          { $push: { roles: role._id } },
          { new: true, useFindAndModify: false },
          function (err, workspace) {
            if (err) return res.status(500).json(err.message);
            Workspace.findById(workspace._id)
              .populate("roles")
              .exec(function (err, workspace) {
                if (err) return res.status(500).json(err.message);
                res.status(200).json(workspace.roles);
              });
          }
        );
      }
    );
  },
  get: (req, res) => {
    const workspaceId = req.params.workspaceId;
    Workspace.findById(workspaceId)
      .populate("roles")
      .exec(function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        res.status(200).json(workspace.roles);
      });
  },
};
