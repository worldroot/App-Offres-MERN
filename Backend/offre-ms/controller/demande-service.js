const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");
const axios = require("axios");
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const { emailKey } = require("../middleware/demandeMailer")
const { verifyAccessToken } = require("../middleware/verify-token");
const {
  validateDemande,
  isRequestValidated,
} = require("../middleware/offreValidator");
const Offre = require("../models/Offre");

// @route   POST api/appeloffre
// @desc    Create demande offre
// @access  User
router.post(
  "/",
  verifyAccessToken,
  validateDemande,
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (responseUser) => {
        var role = responseUser.data.role;
        var emailmail = responseUser.data.email;
        var date = new Date();
        const DateToCheck = new Date(date.getTime());

        if (role !== "user") {
          return res.status(404).json({
            error: "Access Denied !!",
          });
        } else {
          try {
            let { offre, prix, userInfos, userId } = req.body;
            let offreModel = await Offre.findById(offre);
            if (!offreModel) {
              return res.status(403).json({
                error: true,
                msg: "Offre doesnt exist",
              });
            } else {
              if (
                DateToCheck > offreModel.dateDebut &&
                DateToCheck < offreModel.dateFin
              ) {
                if (prix < offreModel.prixdebut) {
                  return res.status(403).json({
                    error: true,
                    msg: "Vérifier votre prix",
                  });
                } else {
                  var PublicKey = key.exportKey('public')
                  var PrivateKey = key.exportKey('private')
                  let key_public = new NodeRSA(PublicKey)
                  let Deckey = new NodeRSA(PrivateKey)

                  emailKey(email, Deckey, `Décryptage clé //${offreModel.titre}`, userInfos  ) 

                  const encrypted = key_public.encrypt(prix, 'base64');
                  const newDem = new Demande({
                    offre,
                    prix: encrypted,
                    userInfos: responseUser.data.email,
                    userId: responseUser.data._id,
                  });
                  newDem.save().then(() => res.json(newDem));
                }
              } else {
                return res.status(403).json({
                  error: true,
                  msg: "Demande impossible !",
                });
              }
            }
          } catch (error) {
            res.status(500).json({
              error: true,
              msg: "server error",
            });
            console.log(error);
          }
        }
      });
  }
);

// @route   PUT api/demande
// @desc    Decrypte Price after date
// @access  Private Admin
router.put(
  "/:demandeId",
  verifyAccessToken,
  validateDemande,
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        let { offre ,prix, key } = req.body;
        var date = new Date();
        const OF = await Offre.findById(offre);
        const Debut = new Date(OF.dateDebut);
        const Fin = new Date(OF.dateFin);
        const DateToCheck = new Date(date.getTime());

        if (role === "admin") {
          //Update by Admin Only
          try {
            // Between dates : DateToCheck > Debut && DateToCheck<Fin
            if (DateToCheck < Debut) {
              const updateDem= await Demande.findByIdAndUpdate(
                req.params.demandeId,
                {
                  $set: {
                   prix
                  },
                },
                { new: true }
              );

              res.status(200).json(updateDem);
            } else {
              res.status(400).json({
                error: true,
                msg: `Modification avant '${Debut.toDateString()}' est impossible !`,
              });
            }
          } catch (error) {
            console.log(error.message);
            res.status(500).json({
              error: true,
              msg: "Server error",
            });
          }
        } else {
          return res.status(404).json({
            error: "Access Denied !!",
          });
        }
      });
  }
);

// @route   Get api/offre/all
// @desc    Get all offre
// @access  Public
router.get("/all", async (req, res) => {
  try {
    const data = await Demande.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
