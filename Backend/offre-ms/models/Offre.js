const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const OffreSchema = new mongoose.Schema({
    titre: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    image: {
        type: Array,
        required: true,
    },
    dateDebut: {
        type: Date,
        required: true,
    },
    dateFin: {
        type: Date,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
    }
})

module.exports = mongoose.model("Offre", OffreSchema)