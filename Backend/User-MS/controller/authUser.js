const express = require('express')
const User = require('../User')
const router = express.Router()
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../middleware/authValidator')
const { signAccessToken } = require('../middleware/verify-token')
const verifUser = require('../middleware/verifUser')

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
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) {
            return res.status(400).json({
            errors: [{ msg: 'Mot de passe incorrect'}]
            })
        }

        if (user.banned === true) {
          return res.status(403).json({
              error: 'Banned Account'
          })
        }
        
        const accessToken = await signAccessToken(user.id)
        res.send({ accessToken })
        
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }

});
  
module.exports = router
