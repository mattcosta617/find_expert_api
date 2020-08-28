const db = require('../models');

const index = (req, res) => {
    db.Expert.find({}, (err, foundExperts) =>{
        if (err) console.log('Error in Experts#index: ', err);

        res.status(200).json(foundExperts);
    });
};

const show = (req, res) => {
    db.Expert.findById(req.params.id, (err, foundExpert) => {
        if (err) console.log('Error in Experts#show: ', err);

        res.status(200).send(foundExpert);
    });
};

const create = (req, res) => {
    db.Expert.create(req.body, (err, savedExpert) => {
        if (err) console.log('Error in Experts#create: ', err);

        res.status(200).json(savedExpert);
    });
};

const update = (req, res) => {
    db.Expert.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedExpert) => {
        if (err) console.log('Error in Experts#update: ', err);

        if (!updatedExpert) {
            res.status(400).json({message: `Could not find expert with id ${req.params.id}`});
        }

        res.json(updatedExpert);
    });
};

const destroy = (req, res) => {
    db.Expert.findByIdAndDelete(req.params.id, (err, deletedExpert) => {
        if (err) console.log('Error in Experts#destroy: ', err);

        res.status(200).json(deletedExpert);
    });
};



module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
