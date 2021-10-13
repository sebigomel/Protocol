const User = require("../models/userModel");

module.exports = {
  get: async (req, res) => {
    let user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  },
};
