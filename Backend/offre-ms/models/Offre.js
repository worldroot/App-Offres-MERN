const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const OffreSchema = new mongoose.Schema({
    titre: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200,
        unique: true
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
    souscategory: {
        type: ObjectId,
        ref: 'SousCategory',
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ["archived", "published", "pending", "closed"],
      },
})

module.exports = mongoose.model("Offre", OffreSchema)