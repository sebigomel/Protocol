const Workspace = require("../models/workspaceModel");
const User = require("../models/userModel");

module.exports = {
  getAllUsers: (req, res) => {
    const { workspaceId } = req.params;
    Workspace.findById(workspaceId, function (err, workspace) {
      const allUsers = workspace.employees.concat(workspace.admins);
      User.find({ _id: { $in: allUsers } })
        .populate("role")
        .exec(function (err, users) {
          res.status(200).json(users);
        });
    });
  },

  create: (req, res) => {
    const { name, description, pictureUrl } = req.body;
    if (!name) {
      name = `${req.user.firstName}'s Workspace ${
        req.user.workspaces.length + 1
      }`;
    }
    Workspace.create(
      {
        name: name,
        admins: req.user._id,
        description: description,
        pictureUrl: pictureUrl,
      },
      function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { workspaces: workspace._id } },
          { new: true, useFindAndModify: false },
          function (err, user) {
            if (err) return res.status(500).json(err.message);
            User.findById(user._id)
              .populate("workspaces")
              .exec(function (err, user) {
                if (err) return res.status(500).json(err.message);
                res.status(200).send(user.workspaces);
              });
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
      if (!workspace) return res.status(404).send("Workspace does not exist");
      if (err) return res.status(500).json(err.message);
      const allUsers = workspace.admins.concat(workspace.employees);
      User.updateMany(
        { _id: { $in: allUsers } },
        { $pull: { workspaces: workspace._id } },
        function (err, user) {
          if (err) return res.status(500).json(err.message);
          User.findById(req.user._id, function (err, user) {
            if (err) return res.status(500).json(err.message);
            User.findById(user._id)
              .populate("workspaces")
              .exec(function (err, user) {
                if (err) return res.status(500).json(err.message);
                res.status(200).send(user.workspaces);
              });
          });
        }
      );
    });
  },

  join: async (req, res) => {
    const { workspaceId } = req.params;
    Workspace.findByIdAndUpdate(
      workspaceId,
      { $push: { employees: req.user._id } },
      function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { workspaces: workspace._id } },
          function (err, user) {
            if (err) return res.status(500).json(err.message);
            res.status(200).json(user);
          }
        );
      }
    );
  },

  update: async (req, res) => {
    let workspaceId = req.params.id;
    let workspace = await Workspace.findById(workspaceId);

    workspace.name = req.body.name;

    workspace.save().then((emp) => {
      res.status(200).send("Your profile has been successfully updated");
      console.log(emp);
    });
  },
};
