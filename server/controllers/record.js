const Device = require("../models/deviceModel");
const Workspace = require("../models/workspaceModel");
const User = require("../models/userModel");
const Record = require("../models/recordModel");

module.exports = {
  create: async (req, res) => {
    const { time, cardId, serialNumber } = req.body;
    let accepted = false;
    let foundUser = await User.findOne({ cardId: cardId });
    let device = await Device.findOne({ serialNumber: serialNumber });
    User.findById(foundUser._id)
      .populate("role")
      .exec(function (err, user) {
        if (err) return res.status(500).json(err.message);
        if (user.role.devices.includes(device._id)) {
          accepted = true;
        }
        Record.create(
          {
            time: time,
            user: user._id,
            device: device._id,
            accepted: accepted,
          },
          function (err, record) {
            if (err) return res.status(500).json(err.message);
            Workspace.findByIdAndUpdate(
              device.workspace,
              { $push: { records: record._id } },
              { new: true, useFindAndModify: false },
              function (err, workspace) {
                if (err) return res.status(500).json(err.message);
                res.status(200).send(record.accepted);
              }
            );
          }
        );
      });
  },
  get: (req, res) => {
    const { workspaceId } = req.params;
    User.findById(req.user._id)
      .populate("workspaces")
      .exec(function (err, user) {
        if (err) return res.status(500).json(err.message);
        const workspace = user.workspaces.find(
          (workspace) => workspace._id === workspaceId
        );
        if (workspace.admins.includes(user._id)) {
          Workspace.findById(workspace._id)
            .populate("records")
            .exec(function (err, workspace) {
              if (err) return res.status(500).json(err.message);
              res.status(200).json(workspace.records)
            });
        }
      });
  },
};
