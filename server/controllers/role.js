const Role = require("../models/roleModel");
const Workspace = require("../models/workspaceModel");
const User = require("../models/userModel");

module.exports = {
  create: (req, res) => {
    const workspaceId = req.params.workspaceId;
    const { name, devices } = req.body;
    Role.create(
      {
        name: name,
        workspace: workspaceId,
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
  assign: (req, res) => {
    const { userId, roleId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $set: { role: roleId } },
      { returnDocument: "after" },
      function (err, user) {
        if (err) return res.status(500).json(err.message);
        User.findById(user._id)
          .populate("role")
          .exec(function (err, user) {
            if (err) return res.status(500).json(err.message);
            else return res.status(200).json(user);
          });
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
  update: async (req, res) => {
    const { role, devices } = req.body;
    Role.findByIdAndUpdate(
      role,
      { $set: { devices: devices } },
      { new: true, useFindAndModify: false },
      function (err, role) {
        if (err) return res.status(500).json(err.message);
        res.status(200).json(role);
      }
    );
  },

  delete: (req, res) => {
    let id = req.params.id;
    Role.findByIdAndDelete(id, (err, role) => {
      if (!role) return res.status(404).send("Role does not exist");
      if (err) return res.status(500).json(err.message);
      Workspace.findByIdAndUpdate(
        role.workspace,
        { $pull: { roles: role._id } },
        function (err, workspace) {
          if (err) return res.status(500).json(err.message);
          Workspace.findById(workspace._id)
            .populate("roles")
            .exec(function (err, workspace) {
              if (err) return res.status(500).json(err.message);
              res.status(200).send(workspace.roles);
            });
        }
      );
    });
  },
};
