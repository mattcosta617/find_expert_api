const db = require("../models")

const index = (req, res) => {
    db.Language.find({}, (err, foundLanguages) => {
        if (err) console.log('Error in languages#index: ', err);

        res.status(200).json(foundLanguages);
    });
};

const show = (req, res) => {
    db.Language.findById(req.params.id, (err, foundLanguage) => {
        if (err) console.log('Error in languages#show: ', err);

        res.status(200).send(foundLanguage);
    });
};

const create = (req, res) => {
    db.Language.create(req.body, (err, savedLanguage) => {
        if (err) console.log('Error in languages#create: ', err);

        res.status(200).json(savedLanguage);
    });
};

const update = (req, res) => {
    db.Language.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedLanguage) => {
        if (err) console.log('Error in languages#update: ', err);

        if (!updatedLanguage) {
            res.status(400).json({message: `Could not find game with id ${req.params.id}`});
        }

        res.json(updatedLanguage);
    });
};

const destroy = (req, res) => {
    db.Language.findByIdAndDelete(req.params.id, (err, deletedLanguage) => {
        if (err) console.log('Error in languages#destroy: ', err);

        res.status(200).json(deletedLanguage);
    });
};



module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
