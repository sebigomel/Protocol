const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let authenticateUser = async (req, res) => { 

    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: 'User does not exist' })

        const correctPassword = await bcrypt.compare(password, existingUser.password);

        if(!correctPassword) return res.status(400).json({ message: 'User or password are incorrect'})

        const token = jwt.sign({email :existingUser.email, __id :existingUser.__id}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24});

        res.status(200).json({ result: existingUser, token })
    }
    catch(err){
        res.status(500).json({ message: 'Something went wrong'})
    }
}

// passport.authenticate('jwt', { session: false })

module.exports = authenticateUser;
