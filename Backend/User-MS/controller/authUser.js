const express = require('express')
const User = require('../models/User')
const Token = require('../models/Token')
const router = express.Router()
const createError = require('http-errors')
const deco = require('jwt-decode')
const emailSender = require("../middleware/sendEmail")
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../middleware/authValidator')
const { signAccessToken, 
        signRefreshToken, 
        verifyRefreshToken, 
        verifyAccessToken } = require('../middleware/verify-token')


// @route   POST /register
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

      
       /**
        *  const token = await new Token({
            userId: savedUser.id,
            token: accessToken
            }).save();
        */
      
      const link = `${process.env.BASE_URL}/api/access/${savedUser.id}/verify/${accessToken}`
      const sendMail = await emailSender(savedUser.email,"Verify Enail",link) 

      var now = new Date()
      const time = deco(accessToken)
      const expiresIn = new Date(now.getHours() + time.exp*1000)
      

      if(sendMail){
        res.status(200).json({ 
          accessToken ,expiresIn ,refreshToken, 
          msg:'Failed to send email !'  })
      }else{
        res.status(200).json({ accessToken ,expiresIn ,refreshToken,
          msg:'Go verify your account !'  })
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

// @route   POST /login
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
      //Verif Banned
        if (user.banned) {
          return res.status(403).json({
              error: true,
              msg: 'Banned Account'
          })
        }

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

      //Verif Active

        /*
        if (!user.active) {
          let token = await Token.findOne({ userId: user.id });
          if (!token) {
            token = await new Token({
              userId: user.id,
              token: accessToken
            }).save();
            const url = `${process.env.BASE_URL}/api/access/${user.id}/verify/${token.token}`
            await sendEmail(user.email, "Verify Email", url);
          }
    
          return res
            .status(400)
            .send({ message: "An Email sent to your account please verify" });
        }
        */

        
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

// @route   POST /refresh-token'
// @desc    Get new Acc Token
// @access  Public
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

// @route   GET /user
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

// @route   GET/:id/verify/:token
// @desc    User Information by token
// @access  Public 
router.get('/:id/verify/:token', async(req, res) =>{
    try {
      const user = await User.findOne({_id:req.params.id})
      if(!user) return res.status(400).json({
        error: true,
        msg:'Invalid link'
      })

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token
      })
      if(!token) return res.status(400).json({
        error: true,
        msg:'Invalid link'
      })

      await User.findByIdAndUpdate(
        req.params.id,
        { $set: {active: true} },
        { new: true }
      );
      //await User.updateOne({_id: user._id, active: true})
      await Token.remove()

      res.status(200).json({
        error: false,
        msg:'Email Verified'
      })

    } catch (error) {

      //console.log(error)
      res.status(500).json({
        error: true,
        msg:'Server error'
      });

    }
})
  
module.exports = router
