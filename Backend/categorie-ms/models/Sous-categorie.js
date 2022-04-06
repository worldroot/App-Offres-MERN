const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const SousCategorySchema = new mongoose.Schema({

    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    catref: {
        type: String,
    },
    sousnomcat: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    },
})

module.exports = mongoose.model('SousCategory', SousCategorySchema)
