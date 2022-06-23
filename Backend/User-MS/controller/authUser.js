const express = require("express");
const User = require("../models/User");
const router = express.Router();
const createError = require("http-errors");
const deco = require("jwt-decode");
const axios = require("axios");
const { emailSender, emailReset } = require("../middleware/sendEmail");
const {
  validateSigninRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../middleware/authValidator");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../middleware/verify-token");

// @route   POST /register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  validateSignupRequest,
  isRequestValidated,
  async (req, res) => {
    const { nom, prenom, email, password, role, OneSignalID, telephone } = req.body;

    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({
        error: true,
        msg: "Utilisateur existe déjà",
      });
    } else {
      try {
        user = new User({ nom, prenom, email, password, role, OneSignalID, telephone });

        const savedUser = await user.save();
        if (!savedUser) throw Error("Something went wrong saving the user");

        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);

        const url = `${process.env.BASE_URL}/api/access/verify/${accessToken}`;
        const sendMail = await emailSender(
          user.email,
          url,
          "Activez votre compte"
        );

        var date = new Date();
        const time = deco(accessToken);
        const expiresIn = new Date(date.getHours() + time.exp * 1000);

        if (sendMail) {
          res.status(400).json({
            error: true,
            msg: "Failed to send email !",
          });
        } else {
          res.status(200).json({
            accessToken,
            expiresIn,
            refreshToken,
            msg: "Go verify your account !",
          });
        }
      } catch (error) {
        //console.log(error);
        res.status(500).json({
          error: true,
          msg: "Erreur lors de l'inscription",
        });
      }

      /*  if (error.errors.password) {
        res.status(500).json({
          error: true,
          msg: "Minimum huit caractères, au moins une lettre et un chiffre",
        });
      } */
    }
  }
);

// @route   POST /login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  validateSigninRequest,
  isRequestValidated,
  async (req, res) => {
    const { email, password, OneSignalID } = req.body;

    try {
      //Mail Verif
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          error: true,
          msg: "Email incorrect",
        });
      }
      if (user.banned) {
        return res.status(403).json({
          error: true,
          msg: "Vous avez été banni !",
        });
      }
      if (user.role === "user") {
        return res.status(403).json({
          error: true,
          msg: "Accès Interdit",
        });
      }
      //Pass Verif
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          error: true,
          msg: "Mot de passe incorrect",
        });
      }

      await User.findByIdAndUpdate(
        user._id,
        { $push: { OneSignalID: OneSignalID } },
        { new: true }
      );

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      var date = new Date();
      const time = deco(accessToken);
      const expiresIn = new Date(date.getHours() + time.exp * 1000);

      res.status(200).json({ accessToken, expiresIn, refreshToken });
    } catch (err) {
      res.status(500).json({
        error: true,
        msg: "Server error",
      });
      console.log(err);
    }
  }
);

router.post(
  "/loginuser",
  validateSigninRequest,
  isRequestValidated,
  async (req, res) => {
    const { email, password, OneSignalID } = req.body;

    try {
      //Mail Verif
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          error: true,
          msg: "Email incorrect",
        });
      }
      //Pass Verif
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          error: true,
          msg: "Mot de passe incorrect",
        });
      }
      //Verif Banned
      if (user.banned) {
        return res.status(403).json({
          error: true,
          msg: "Vous avez été banni !",
        });
      }

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      var date = new Date();
      const time = deco(accessToken);
      const expiresIn = new Date(date.getHours() + time.exp * 1000);

      await User.findByIdAndUpdate(
        user._id,
        { $push: { OneSignalID: OneSignalID } },
        { new: true }
      );

      //Verif Active
      if (!user.active) {
        const createdAt = new Date(user.createdAt).toDateString();
        const body = {
          userId: user.id,
          date: createdAt,
          array: user.OneSignalID,
        };
        await axios.post("http://localhost:5004/api/notif/verif-account", body);

        res.status(200).json({
          accessToken,
          expiresIn,
          refreshToken,
          msg: "Une-mail vient de vous être envoyé",
        });
      } else {
        res.status(200).json({ accessToken, expiresIn, refreshToken });
      }
    } catch (err) {
      res.status(500).json({
        error: true,
        msg: "Server error",
      });
      console.log(err);
    }
  }
);

// @route   POST /refresh-token'
// @desc    Get new Acc Token
// @access  Public
router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);

    var date = new Date();
    const time = deco(accessToken);
    const expiresIn = new Date(date.getHours() + time.exp * 1000);

    res.status(200).json({ accessToken, expiresIn });
    //console.log({accessToken, expiresIn})
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
    next(error);
  }
});

// @route   GET /user
// @desc    User Information by token
// @access  Public
router.get("/getuser", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
    console.log(error);
  }
});

// @route   GET/:id/verify/:token
// @desc    Verif Email
// @access  Public
router.get("/verify/:token", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user)
      return res.status(400).json({
        error: true,
        msg: "Invalid link",
      });

    if (!user.active) {
      await User.findByIdAndUpdate(
        req.user.id,
        { $set: { active: true } },
        { new: true }
      );

      const body = {
        userId: user.id,
        nom: user.nom,
        array: user.OneSignalID,
      };
      await axios.post("http://localhost:5004/api/notif/welcome", body);

      res.status(200).json({
        error: false,
        msg: "Email Verified",
      });
    } else {
      res.status(400).json({
        error: true,
        msg: "Already Verified",
      });
    }
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

// @route   GET
// @desc    User Information by token
// @access  Public
router.get("/resend/:token", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(400).json({
        error: true,
        msg: "Invalid link",
      });
    } else {
      const url = `${process.env.BASE_URL}/api/access/verify/${req.params.token}`;
      await emailSender(user.email, url, "Activez votre compte");

      res.status(200).json({
        error: false,
        msg: "An Email sent to your account please verify",
      });

      const createdAt = new Date(user.createdAt).toDateString();
      const body = {
        userId: user.id,
        date: createdAt,
        array: user.OneSignalID,
      };
      await axios.post("http://localhost:5004/api/notif/verif-account", body);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

// @route   POST
// @desc    Forgot Pass
// @access  Public
router.post("/forgot-pass", async (req, res) => {
  try {
    // get email
    const { email } = req.body;

    // check email
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        msg: "email inexistant",
      });

    const accessToken = await signAccessToken(user.id);
    // send email
    const url = `${process.env.BASE_URL}/reset-pass/${accessToken}`;
    await emailReset(
      user.email,
      url,
      "Réinitialisez votre mot de passe",
      user.nom
    );

    // success
    res
      .status(200)
      .json({ msg: "Reset the password, please check your email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   GET/:id/verify/:token
// @desc    Verif Token
// @access  Public
router.get("/:token", verifyAccessToken, async (req, res) => {
  try {
    res.status(200).json({
      error: false,
      msg: "Token Verifié",
    });
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
