const mongoose = require('mongoose');
const Project = require('./Project');
const Languages = require('./Language');

const ExpertSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    bio: String,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Languages",
    }]
}, {timestamps: true});


const Expert = mongoose.model('Expert', ExpertSchema);
module.exports = Expert;

