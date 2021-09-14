const { User } = require('../models/userModel')

let createUser = async (req, res) => {

    newUser = new User(req.body);

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = createUser;