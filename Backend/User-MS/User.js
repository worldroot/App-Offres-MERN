const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
     nom: {
        type: String,
        required: true,
      },
      prenom: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, 
      },
      password: {
        type: String,
        required: true,
      },
      telephone: { type: String },
      role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
      }

    },
        { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema)