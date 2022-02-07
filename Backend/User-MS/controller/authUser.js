const express = require('express')
const User = require('../User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CryptoJS = require("crypto-js");
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../middleware/authValidator')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../middleware/verify-token')

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', 
    validateSignupRequest, 
    isRequestValidated, 
    async (req, res) => {

    const { nom, prenom, email, password } = req.body;

    try {

      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Utilisateur existe déjà',}, ],
        }); }

      user = new User({ nom, prenom , email, password });

      const savedUser = await user.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
      
      const accessToken = await signAccessToken(savedUser.id)
      //const refreshToken = await signRefreshToken(savedUser.id)

      res.send({ accessToken })

    } catch (error) {

        console.log(error.message);
        res.status(500).send('Server error');
    }
   
  }
);


// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post('/login', 
    validateSigninRequest,
    isRequestValidated,
    async (req, res) => {
          
    const {email, password} = req.body;
  
    try {
     
      //Mail Verif
      let user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
            errors: [{ msg: 'Email incorrect'}]
            })
        }
      
      //Pass Verif
      const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
            errors: [{ msg: 'Mot de passe incorrect'}]
            })
        }
  
      const payload = { user: {id: user.id} }
  
      jwt.sign(
        payload,
        "SECRET", {
          expiresIn: 360000
        }, (err, token) => {
          if (err) throw err;
          res.json({
            token,
          })
        }
      )
      console.log("Login Done");

    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }

  })
  
  module.exports = router
