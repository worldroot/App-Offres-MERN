const express = require('express')
const router = express.Router()
const User = require('../User')
const verifToken = require('../middleware/auth')
const AdminAccess = require('../middleware/adminAuth')
const SuperAdminAccess = require('../middleware/superadminAuth')
const userid = require('../middleware/userByid')
const bcrypt = require('bcryptjs')


// @desc    update user
// @access  Public
router.put('/:id', 
    verifToken,
    async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: {nom, prenom, email}=req.body, },
        { new: true }
      );

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }

})


// @desc    update user password
// @access  Public
router.put('/updatepwd/:id', 
    verifToken,
    async (req, res) => { 

    if(req.body.password){
        const salt = await bcrypt.genSalt(10); 
        req.body.password = await bcrypt.hash(req.body.password, salt); 
    }  
    
    try {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body, },
        { new: true }
    );

    res.status(200).json(updatedUser.password);

    } catch (err) {
    res.status(500).json(err);
    console.log(err)
    }

}) 


// @desc    update user role
// @access  Super Admin
router.put('/superadmin/:id', 
    verifToken,
    SuperAdminAccess,
    async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: {role}=req.body, },
        { new: true }
      );

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }

})


module.exports = router