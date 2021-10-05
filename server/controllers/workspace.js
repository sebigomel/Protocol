const Workspace = require('../models/workspaceModel');
const User = require('../models/userModel')

let createWorkspace = (req, res) => {
    Workspace.create({name : `Workspace  ${req.user.workspaces.length + 1}`, admins: req.user._id}, function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        User.findByIdAndUpdate(req.user._id ,
            {$push: {workspaces: workspace._id}},
            {new: true, useFindAndModify: false},
            function (err, user) {
                if (err) return res.status(500).json(err.message);
                res.status(201).json(user);})
    })
};

let getWorkspaces = async (req, res) => {
    User.
      findById(req.user._id).
      populate("workspaces").
      exec(function (err, user) {
        if (err) return res.status(500).json(err.message);
        res.status(200).send(user.workspaces);
      });
    }

module.exports = {createWorkspace, getWorkspaces};