const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({

    nomcat: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    },
    type: {
        type: String
    },
    imgc:{
        type:String
    }
})

module.exports = mongoose.model('Category', CategorySchema)
