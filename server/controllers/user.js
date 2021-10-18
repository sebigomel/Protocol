const User = require("../models/userModel");

module.exports = {
  getOthersInfo: async (req, res) => {
    username = req.params.username;
    let user = await User.findOne({ username: username }).select("-password");
    res.status(200).json(user);
  },
  getMyInfo: async (req, res) => {
    let user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  },
  verifyEmail: async (req, res) => {},

  update: async (req, res) => {
    const cardId = req.body.cardId;
    const email = req.body.email;
    const password = req.body.password;
    const vaccine = req.body.vaccine;
    const doses = req.body.doses;
    let user = await User.findById(req.user._id);
    console.log(vaccine);
    switch (true) {
      case cardId:
        user.cardId = cardId;
        break;
      case email:
        user.email = email;
        break;
      case password:
        user.password = password;
        break;
      case vaccine:
        user.vaccination.vaccine = vaccine;
        break;
      case doses:
        user.vaccination.doses = doses;
        break;
    }

    user.save().then((emp) => {
      res.status(200).send("Your profile has been successfully updated");
      console.log(emp);
    });
  },
};
