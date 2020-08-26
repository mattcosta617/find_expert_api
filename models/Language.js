const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema ({
    id: mongoose.Schema.Types.ObjectId,
    language: String,
})

Language = mongoose.model("Language", LanguageSchema)
module.exports = Language;