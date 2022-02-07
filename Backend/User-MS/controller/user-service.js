const express = require('express')
const router = express.Router()
const User = require('../User')
const verifToken = require('../middleware/auth')
const AdminAccess = require('../middleware/adminAuth')
const SuperAdminAccess = require('../middleware/superadminAuth')
const userid = require('../middleware/userByid')
const bcrypt = require('bcryptjs')
const CryptoJS = require("crypto-js");

router.put('/:id',
    verifToken,
    async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body, },
        { new: true }
      );

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }

})

router.put('/updatepwd/:userId',
    userid,
    verifToken,
    async (req, res) => {
        const {password} = req.body
        let user = req.user

        if (password) {
            password = CryptoJS.AES.decrypt(
              password,
              "K003"
            ).toString();

            user.password = password.trim()
          }

        try {

            user = await user.save()
            res.status(200).json(user);
            
        } catch (error) {
            res.status(500).json(error);
        }


})

module.exports = router