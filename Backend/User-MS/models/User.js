const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  
      username: {
        type: String,
      }, 
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
      },
      active: {
        type: Boolean,
        required: true,
        default: false
      },
      banned: {
        type: Boolean,
        default: false
      },
      listOffres: {
        type: Array,
        items: { type: String, unique:true }
      }

    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try { 
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    console.error(error)
    throw error
    
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = mongoose.model('User', UserSchema)