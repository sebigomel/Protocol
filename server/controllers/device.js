const Device = require('../models/deviceModel');
const Workspace = require('../models/workspaceModel');

let configDevice = async (req, res) => {
    //configCode = Math.floor(100000 + Math.random() * 900000)

}

let addDevice = (req, res) => {
    /*serialNumber = req.body.serialNumber
    workspaceId = req.params.workspaceId
    Device.create({name : `Entrance  ${req.user.workspaces.length + 1}`, admins: req.user._id}, function (err, workspace) {
        if (err) return res.status(500).json(err.message);
        console.log(workspace)
        User.findByIdAndUpdate(
            {_id : req.user._id },
            {$push: {workspaces: workspace._id}},
            {new: true, useFindAndModify: false},
            function (err, user) {
                if (err) return res.status(500).json(err.message);
                res.status(201).json(user);})
    })*/
};


module.exports = addDevice