const db = require('../models');

const index = (req, res) => {
    db.Project.find({}, (err, foundProjects) =>{
        if (err) console.log('Error in Projects#index: ', err);

        res.status(200).json(foundProjects);
    });
};

const show = (req, res) => {
    db.Project.findById(req.params.id, (err, foundProject) => {
        if (err) console.log('Error in Projects#show: ', err);

        res.status(200).send(foundProject);
    });
};

const create = (req, res) => {
    db.Project.create(req.body, (err, savedProject) => {
        if (err) console.log('Error in Projects#create: ', err);

        res.status(200).json(savedProject);
    });
};

const update = (req, res) => {
    db.Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProject) => {
        if (err) console.log('Error in Projects#update: ', err);

        if (!updatedProject) {
            res.status(400).json({message: `Could not find project with id ${req.params.id}`});
        }

        res.json(updatedProject);
    });
};

const destroy = (req, res) => {
    db.Project.findByIdAndDelete(req.params.id, (err, deletedProject) => {
        if (err) console.log('Error in Projects#destroy: ', err);

        res.status(200).json(deletedProject);
    });
};



module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
