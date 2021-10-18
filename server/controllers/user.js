const User = require("../models/userModel");

module.exports = {
  getOthersInfo: async (req, res) => {
    username = req.params.username
    let user = await User.findOne({username: username}).select("-password");
    res.status(200).json(user);
  },
  getMyInfo: async (req, res) => {
    let user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  },
  verifyEmail: async (req, res) => {},
  update: async (req, res) => {
    let user = await User.findById(req.user._id);
    let { cardId, email, password, vaccine, doses} = req.body
    if (email) {user.verified = false;} 
    user.cardId = cardId;
    user.email = email;
    user.password = password;
    user.vaccination.vaccine = vaccine;
    user.vaccination.doses = doses;

    user.save().then(emp => {
      res.status(200).send("Your profile has been successfully updated");
    })
  },
};
