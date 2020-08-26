const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');


const index = (req, res) => { // Not supposed to use this route
    db.User.find({}, (err, foundUsers) =>{
        if (err) console.log('Error in Users#index: ', err);

        res.status(200).json(foundUsers);
    });
};


const register = async (req, res) => {
    // Validate Field Input
    console.log(req.body);
    if (
        !req.body.username || 
        !req.body.email || 
        !req.body.password
        ) {
    return res.status(400).json({message: 'All fields are required. Please try again'});
    }
    
    if (req.body.password.length < 4) {
        return res.status(400).json({message: "Password must be at least 6 characters or more"})
    }

    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if(foundUser) {
            res.status(400).json({
                status: 400,
                message: "Email address has already been registered. Please try again.",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(req.body.password, salt);

        await db.User.create({ ...req.body, password: hash });

        return res.status(201).json({status: 201, message: "Success!"});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};


const login = async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (!foundUser) {
            return res.status(400).json({
                status: 400,
                message: "Username or password is incorrect"
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Username or password is incorrect",
            });
        }

        const payload = {id: foundUser._id};
        const secret = process.env.JWT_SECRET;
        const expiration = {expiresIn: "1h"};

        const token = await jwt.sign(payload, secret, expiration);

        res.status(200).json({token});   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};


const verify = async (req, res) => {
    const token = req.headers['authorization'];
    console.log(req.headers)
    console.log('Verify Token ----> ', token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser) {
            return res.status(401).json({
                message: "You are not authorized. Please login and try again"
            });
        }

        req.currentUser = decodedUser;

        res.status(200).json({user: decodedUser});
    });
};

module.exports = {
    index, // <------ Not supposed to use this route
    register,
    login,
    verify,
};