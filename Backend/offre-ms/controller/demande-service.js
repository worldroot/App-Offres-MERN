const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");
const axios = require("axios");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 384 });
const { emailKey } = require("../middleware/demandeMailer");
const { ToCrypte, ToDecrypte, PrivateKey } = require("../middleware/Cryptage");
const { verifyAccessToken } = require("../middleware/verify-token");
const { validateDemande, isRequestValidated } = require("../middleware/offreValidator");
const Offre = require("../models/Offre");
const demandeByid = require("../middleware/demandeByid");

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
        var email = responseUser.data.email;
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
            const Debut = new Date(offreModel.dateDebut);
            const Fin = new Date(offreModel.dateFin);
            const AdminMail = offreModel.postedBy
            if (!offreModel) {
              return res.status(403).json({
                error: true,
                msg: "Offre doesnt exist",
              });
            } else {
              if (DateToCheck > Debut && DateToCheck < Fin) {
                if (prix < offreModel.prixdebut) {
                  return res.status(403).json({
                    error: true,
                    msg: "Vérifier votre prix",
                  });
                } else {
                  emailKey(
                    AdminMail,
                    PrivateKey,
                    `Décryptage clé pour l'offre: ${offreModel.titre}`,
                    email
                  );
                  const encrypted = ToCrypte(prix);
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
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        let DemandeModel = await Demande.findById(req.params.demandeId);
        var date = new Date();
        const OF = await Offre.findById(DemandeModel.offre);
        const Debut = new Date(OF.dateDebut);
        const Fin = new Date(OF.dateFin);
        const DateToCheck = new Date(date.getTime());

        if (role === "admin") {
          //Update by Admin Only
          try {
            if (DateToCheck > Fin) {
              let { key } = req.body;
              const decrypted = ToDecrypte(key, DemandeModel.prix);
              const up = await Demande.findByIdAndUpdate(
                req.params.demandeId,
                { $set: { prix: decrypted } },
                { new: true }
              );
              res.status(200).json(up);
            } else {
              res.status(400).json({
                error: true,
                msg: "Décryptage Impossible",
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
