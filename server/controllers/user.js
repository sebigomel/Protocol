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

    const newUserData = {
        cardId,
        username,
        firstName,
        lastName,
        email,
        birthdate
    }

    bcrypt.hash(password, 10, function(err, hash) {
        newUserData[password] = hash; 
    });

    const newUser = new User(newUserData);

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = createUser;