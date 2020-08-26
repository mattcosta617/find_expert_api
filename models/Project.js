const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    project_url: String,
});

Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

