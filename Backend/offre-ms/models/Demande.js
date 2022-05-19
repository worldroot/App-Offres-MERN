const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const DemandeSchema = new mongoose.Schema(
  {
    offre: {
      type: ObjectId,
      ref: "Offre",
      required: true,
    },
    prix: {
      type: String,
      required: true,
    },
    userInfos: {
      type: String,
      required: true,
    },
    userId: {
        type: String,
        required: true,
      },
    etat: {
      type: String,
      enum: ["en cours de traitement", "published", "pending", "closed"],
      default: "pending"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Demande", DemandeSchema);
