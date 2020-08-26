const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    bio: String,
}, {timestamps: true});


const Expert = mongoose.model('Expert', ExpertSchema);
module.exports = Expert;

