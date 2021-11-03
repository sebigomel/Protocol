const Device = require("../models/deviceModel");
const Workspace = require("../models/workspaceModel");

module.exports = {
  create: (req, res) => {
    const { serialNumber, name, workspace } = req.body;
    Device.create(
      {
        serialNumber: serialNumber,
        name: name,
        workspace: workspace,
      },
      function (err, device) {
        if (err) return res.status(500).json(err.message);
        Workspace.findByIdAndUpdate(
          device.workspace,
          { $push: { devices: device._id } },
          { new: true, useFindAndModify: false },
          function (err, workspace) {
            if (err) return res.status(500).json(err.message);
            Workspace.findById(workspace._id)
              .populate("devices")
              .exec(function (err, workspace) {
                if (err) return res.status(500).json(err.message);
                res.status(200).json(workspace.devices);
              });
          }
        );
      }
    );
  },
  get: (req, res) => {
    const workspaceId = req.params.workspaceId;
    Workspace.findById(workspaceId)
      .populate("devices")
      .exec(function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        res.status(200).json(workspace.devices);
      });
  },

  getOne: async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await Device.findById(deviceId).select("name");
    res.status(200).json(device);
  },
};
