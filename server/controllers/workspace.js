const Workspace = require("../models/workspaceModel");
const User = require("../models/userModel");

module.exports = {
  create: (req, res) => {
    Workspace.create(
      {
        name: `${req.user.firstName}'s Workspace ${
          req.user.workspaces.length + 1
        }`,
        admins: req.user._id,
      },
      function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { workspaces: workspace._id } },
          { new: true, useFindAndModify: false },
          function (err, user) {
            if (err) return res.status(500).json(err.message);
            res.status(201).json(user);
          }
        );
      }
    );
  },

  getUsers: async (req, res) => {
    User.findById(req.user._id)
      .populate("workspaces")
      .exec(function (err, user) {
        if (err) return res.status(500).json(err.message);
        res.status(200).send(user.workspaces);
      });
  },

  getOne: async (req, res) => {
    let workspaceId = req.params.id;
    let workspace = await Workspace.findById(workspaceId);
    res.status(200).json(workspace);
  },

  delete: async (req, res) => {
    let id = req.params.id;
    Workspace.findByIdAndDelete(id, (err, workspace) => {
      if(!workspace) return res.status(404).send("Workspace does not exist");
      if (err) return res.status(500).json(err.message);
      User.findByIdAndUpdate(req.user._id, {
        $pull: {
          workspaces: { $in: [workspace._id] },
        },
      }, (err, user) => {
        if (err) return res.status(500).json(err.message);
        res.status(200).json(user.workspaces);
      });
    });
  },
};
