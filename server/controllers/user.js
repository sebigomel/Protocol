const User = require('../models/userModel');

let getUser = async (req, res) => {
    username = req.params.username;
    let user = await User.findOne({ username: username})
    res.status(200).json(user)
}

module.exports = getUser;