const Device = require('../models/deviceModel');

let addDevice = async (req, res) => {
    serialNumber = req.body.serialNumber;
    const newDevice = new Device(serialNumber)

    try {
        await newDevice.save();
        res.sendStatus(201);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = addDevice