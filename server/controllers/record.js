const Device = require("../models/deviceModel");
const Workspace = require("../models/workspaceModel");
const User = require("../models/userModel");
const Record = require("../models/recordModel");

const updateWorkspace = (id, callback) => {
  Workspace.findById(id)
    .populate("records")
    .exec(function (err, workspace) {
      Record.find({ device: { $in: workspace.devices } })
        .populate("user", "firstName lastName email profileImageUrl")
        .populate("device", "name")
        .exec(function (err, records) {
          if (err) console.log(err);
          callback(records);
        });
    });
};

module.exports = {
  create: async (req, res) => {
    const { cardId, serialNumber } = req.body;
    let accepted = false;
    const foundUser = await User.findOne({ cardId: cardId });
    const device = await Device.findOne({ serialNumber: serialNumber });
    console.log(device);
    User.findById(foundUser._id)
      .populate("role")
      .exec(function (err, user) {
        if (err) return res.status(500).json(err.message);
        if (user.role && user.role.devices.includes(device._id)) {
          accepted = true;
        }
        Record.create(
          {
            time: Date.now(),
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
                res.status(200).json({ accepted: record.accepted });
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
        if (err) return res.status(500).send(err.message);
        let workspace = user.workspaces.find(
          (w, index) => w._id == workspaceId
        );
        if (workspace.admins.includes(user._id)) {
          Workspace.findById(workspaceId)
            .populate("records")
            .exec(function (err, workspace) {
              if (err) return res.status(500).send(err.message);
              else res.status(200).json(workspace.records);
            });
        }
      });
  },

  getRealTime: async (req, res) => {
    const { workspaceId } = req.params;
    res
      .set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      })
      .status(200);
    const callback = (data) => {
      res.write("data: " + JSON.stringify(data));
      res.write("\n\n");
    };
    const interValID = setInterval(() => {
      updateWorkspace(workspaceId, callback);
    }, 2000);

    res.on("close", () => {
      console.log("client dropped me");
      clearInterval(interValID);
      res.end();
    });
  },
};
