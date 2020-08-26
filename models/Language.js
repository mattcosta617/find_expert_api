const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema ({
    id: mongoose.Schema.Types.ObjectId,
    language: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

Language = mongoose.model("Language", LanguageSchema)
module.exports = Language;