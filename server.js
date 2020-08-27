const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config()

// Routes defined
experts = require("./routes/experts");
languages = require("./routes/languages");
projects = require("./routes/projects");
users = require("./routes/users");


app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully!!");
})


const authRequired = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(req.headers)
  console.log('Verify ------> ', token);


// VERIFY TOKEN
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser) {
            return res.status(401).json({
                message: "You are not authorized. Please login and try again"
            });
        }

        req.currentUser = decodedUser;

       next();
    });
}




// middleware - API routes
// Experts Routes
app.use('/api/v1/experts', experts);
// Users Routes
app.use('/api/v1/users', users);
// Languages Routes
app.use('/api/v1/languages', languages);
// Project Routes
app.use('/api/v1/projects', projects);

app.listen(PORT,() => {
    console.log(`listening at local host ${PORT}`);
});