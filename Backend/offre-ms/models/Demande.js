const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const DemandeSchema = new mongoose.Schema(
  {
    offre: {
      type: ObjectId,
      ref: "Offre",
    },
    properties: {
      type: Object
    },
    etat: {
      type: String,
      enum: ["En cours", "Reçu"],
      default: "Reçu",
    },
  }
);

module.exports = mongoose.model("Demande", DemandeSchema);
