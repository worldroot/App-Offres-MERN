const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const VerifToken = require('../middleware/auth')
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../middleware/authValidator')
const User = require('../User')


router.post('/register', 
    validateSignupRequest, 
    isRequestValidated, 
    VerifToken,
    async (req, res) => {

    const {
      nom,
      prenom,
      email,
      password
    } = req.body;

    try {

      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Utilisateur existe déjà',}, ],
        }); }

      user = new User({ nom, prenom , email, password, });

      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(password, salt); 
      
      const savedUser = await user.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
      console.log("User +");

      const payload = { user: {id: user.id,} ,};

      jwt.sign(
        payload,
        process.env.JWT_SECRET, {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token, savedUser
          });
        }
      );
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
    VerifToken,
    async (req, res) => {

    const {email, password} = req.body;
  
    try {
     
      let user = await User.findOne({email});
      
        if (!user) {
            return res.status(400).json({
            errors: [{ msg: 'Email incorrect'}]
            })
        }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Mot de passe incorrect'}]
        })
      }
  
      const payload = { user: {id: user.id} }
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET, {
          expiresIn: 360000
        }, (err, token) => {
          if (err) throw err;
          res.json({
            token
          })
        }
      )
      console.log("Login Done");

    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
  })
  
  module.exports = router
