const User = require('../models/userModel')
const bcrypt = require('bcrypt')

let createUser = async (req, res) => {

    const cardId = req.body.cardId;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const birthdate = req.body.birthdate;
    const password = req.body.password;
    const passwordCheck = req.body.passwordCheck;

    const existingEmail = await User.findOne({email : email});
    if(existingEmail) {
        return res
             .status(400)
             .json({ msg : "An account with this email already exists" })
    } 

    if(password !== passwordCheck){
        return res
            .status(400)
            .json({ msg : "Passwords do not match" })
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        cardId : cardId,
        username : username,
        firstName : firstName,
        lastName : lastName,
        email : email,
        birthdate : birthdate,
        password : passwordHash
    });

    try {
        await newUser.save();
        res.sendStatus(201);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }


}

module.exports = createUser;