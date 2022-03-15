const mongoose = require('mongoose')

const SousCategorySchema = new mongoose.Schema({

    sousnomcat: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    },
})

module.exports = mongoose.model('SousCategory', SousCategorySchema)
