const mongoose = require('mongoose')

const OffreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    prixdebut: {
        type: String
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
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    postedBy: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["archived", "published", "pending", "closed"],
        default: "pending"
      },
})

module.exports = mongoose.model("Offre", OffreSchema)