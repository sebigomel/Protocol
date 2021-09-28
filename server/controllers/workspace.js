const Workspace = require('../models/workspaceModel');
const User = require('../models/userModel');

let createWorkspace = async (req, res) => {
    let userid = req.params.userid;
    newWorkspace = new Workspace({name: "Workspace", admins: [{ admin: userid }] });

    try {
        await newWorkspace.save();
        res.sendStatus(201);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = createWorkspace;