const express = require('express')
const router = express.Router()
const User = require('../User')
const AdminAccess = require('../middleware/adminAuth')
const SuperAdminAccess = require('../middleware/superadminAuth')
const AdminAndSuper = require('../middleware/doubleAuth')
const userid = require('../middleware/userByid')
const bcrypt = require('bcryptjs')
const { verifyAccessToken } = require('../middleware/verify-token')
const e = require('express')


// @desc    update user
// @access  Public
router.put('/', 
    verifyAccessToken,
    async (req, res) => {

  try {
    
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: {nom, prenom, email}=req.body, },
        { new: true }
      );
    res.status(200).json({
        message: `Updated successfully-> Nom: ${updatedUser.nom}, Prenom: ${updatedUser.prenom}, Email: ${updatedUser.email}`
    })

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }

})

// @desc    update user password Double Pass
// @access  Public
router.put('/updatepwd', 
    verifyAccessToken,
    async (req, res) => { 

    const {password , confirmpass} = req.body  
    if(password !== confirmpass){
      return res.status(403).send('Passwords are not matched !')

    }else {

        const salt = await bcrypt.genSalt(10); 
        req.body.password = await bcrypt.hash(req.body.password, salt); 
  
      try {

          const updatedUser = await User.findByIdAndUpdate(
              req.user.id,
              { $set: req.body, },
              { new: true }
          );
      
          res.status(200).json(updatedUser.password);
      
          } catch (err) {
          res.status(500).json(err);
          console.log(err)
          }
    }

}) 

// @desc    banning user 
// @access  Super Admin
router.put('/ban/:id', 
    verifyAccessToken,
    AdminAndSuper,
    async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: {banned}=req.body, },
        { new: true }
      );

    res.status(200).json({
      message: `User: ${updatedUser.nom} -> Banned: ${updatedUser.banned} `
    })

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }

})

// @desc    update user role 
// @access  Super Admin
router.put('/role/:id', 
    verifyAccessToken,
    SuperAdminAccess,
    async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: {role}=req.body, },
        { new: true }
      );

    res.status(200).json({
        message: `Role: ${updatedUser.role} : updated successfully`
    })

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }

})


// @route   GET api/user
// @desc    User Information by token
// @access  Public 
router.get('/:id',async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    res.json(user)
  } catch (error) {

    console.log(error.message);
    res.status(500).send('Server Error')

  }
})

// @route   GET api/user
// @desc    All
// @access  Public 
router.get('/',
  verifyAccessToken,
  AdminAndSuper,
  async (req,res) => {
  try {
      let users = await User.find({}).select('-password')
      res.json(users)

  } catch (error) {
      console.log(error)
      res.status(500).send('Server error')
  }
})


module.exports = router