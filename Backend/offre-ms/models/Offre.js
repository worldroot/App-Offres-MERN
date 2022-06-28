const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

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
        type: String,
        default: ""
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
        type: ObjectId,
        required: true,
    },
    responsable: {
        type: ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ["archived", "published", "pending", "closed", "résultats"],
        default: "pending"
      },
    archived: {
        type: Boolean,
        default: false
      },
    publickey: {
        type: String,
        default: ""
    },
})

module.exports = mongoose.model("Offre", OffreSchema)