const express = require('express')
const User = require('../User')
const router = express.Router()
const createError = require('http-errors')
const deco = require('jwt-decode')
const emailSender = require("../middleware/sendEmail")
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../middleware/authValidator')
const { signAccessToken, 
        signRefreshToken, 
        verifyRefreshToken, 
        verifyAccessToken } = require('../middleware/verify-token')


// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', 
    validateSignupRequest, 
    isRequestValidated, 
    async (req, res) => {

    const { nom, prenom, email, password, role } = req.body;

    try {

      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({
          error: true,
          msg: 'Utilisateur existe déjà',
        });
       }

      user = new User({ nom, prenom , email, password, role });

      const savedUser = await user.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
      
      const accessToken = await signAccessToken(savedUser.id)
      const refreshToken = await signRefreshToken(savedUser.id)
      
      const link = "http//" + req.hostname + ":5001/api/email/verify?accessToken="+accessToken;
      const sendMail = await emailSender(savedUser.email, link) 

      var now = new Date()
      const time = deco(accessToken)
      const expiresIn = new Date(now.getHours() + time.exp*1000)
      

      if(sendMail){
        res.status(200).json({ 
          accessToken ,expiresIn ,refreshToken, 
          msg:'Failed to send email !'  })
      }else{
        res.status(200).json({ accessToken ,expiresIn ,refreshToken  })
      }


    } catch (error) {

        console.log(error);
        res.status(500).json({
          error: true,
          msg:'Server error'
        });
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
              error: true,
              msg: 'Email incorrect'
            })
        }
      //Pass Verif
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) {
            return res.status(400).json({
              error: true,
              msg: 'Mot de passe incorrect'
            })
        }

        if (user.banned === true) {
          return res.status(403).json({
              error: true,
              msg: 'Banned Account'
          })
        }
        


        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        var now = new Date()
        const time = deco(accessToken)
        const expiresIn = new Date(now.getHours() + time.exp*1000)

        res.status(200).json({ accessToken, expiresIn, refreshToken  })
        
    } catch (err) {
      res.status(500).json({
        error: true,
        msg:'Server error'
      });
      console.log(err)
    }

});

/*
 const refreshToken = localStorage.getItem("refreshToken")
        const decodedToken = decode(accessToken)
  
        if(decodedToken.exp * 1000 < new Date().getTime()){
  
            refreshJwt({refreshToken})
             */


router.post('/refresh-token',
  async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      
      res.status(200).json({accessToken})
    } catch (error) {

      res.status(500).json({
        error: true,
        msg:'Server error'
      });
      next(error)
      
    }
  
})

// @route   GET api/user
// @desc    User Information by token
// @access  Public 
router.get('/getuser',
    verifyAccessToken  
    ,async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    
    res.status(500).json({
      error: true,
      msg:'Server error'
    });
    console.log(error);

  }
})
  
module.exports = router
