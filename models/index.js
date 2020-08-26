// const mongoose = require('mongoose');

// console.log('MONGO DB =', process.env.MONGODB_URI);

// require("dotenv").config();

// const connectionString = process.env.MONGODB_URI;
// const configOptions = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// };


// mongoose.connect(connectionString, configOptions)
//     .then(() => console.log('MongoDB successfully connected...'))
//     .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  Expert: require('./Expert'),
  Language: require('./Language'),
  Project: require('./Project'),
  User: require('./User'),
};

