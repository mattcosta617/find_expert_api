const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {

    const token = req.headers['authorization'];
    console.log(req.headers)
    console.log('Verify Token ----> ', token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
            return res.status(401).json({
                message: 'You are not authorized. Please login and try again'
            });
        }

        req.currentUser = decodedUser;

        next();
    });
}

module.exports = authRequired;