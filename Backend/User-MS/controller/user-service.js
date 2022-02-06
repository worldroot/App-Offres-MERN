const express = require('express')
const router = express.Router()
const User = require('../User')
const verifToken = require('../middleware/auth')
const AdminAccess = require('../middleware/adminAuth')
const SuperAdminAccess = require('../middleware/superadminAuth')
const userid = require('../middleware/userByid')
const bcrypt = require('bcryptjs')

router.put('/:userId',
    userid,
    verifToken,

    async (req, res) => {

        if (req.body.password) {
            req.body.password = bcrypt. encrypt(
              req.body.password,
              "SECRET"
            ).toString();
          }

  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }

})

module.exports = router