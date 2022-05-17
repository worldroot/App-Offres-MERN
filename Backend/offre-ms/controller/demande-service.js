const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");
const Offre = require("../models/Offre");
const axios = require("axios");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 384 });
const { emailKey } = require("../middleware/demandeMailer");
const { ToCrypte, ToDecrypte, PrivateKey } = require("../middleware/Cryptage");
const { verifyAccessToken } = require("../middleware/verify-token");
const {
  validateDemande,
  isRequestValidated,
} = require("../middleware/offreValidator");

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
            let { offre, prix } = req.body;
            let offreModel = await Offre.findById(offre);
            const Debut = new Date(offreModel.dateDebut);
            const Fin = new Date(offreModel.dateFin);
            const AdminMail = offreModel.postedBy;
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
                    titreOffre: offreModel.titre,
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
              res.status(401).json({
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

// @route   Delete api/demande/:demandeId
// @desc    Delete Single demande
// @access
router.delete(
  "/:demandeId",
  isRequestValidated,
  verifyAccessToken,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        if (role !== "user") {
          return res.status(404).json({
            error: "Access Denied",
          });
        } else {
          try {
            await Demande.findByIdAndDelete(req.params.demandeId);
            res.status(200).json({
              message: `Deleted successfully`,
            });
          } catch (error) {
            console.log(error.message);
            res.status(500).json({
              error: true,
              msg: "Server error",
            });
          }
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

router.get("/byuser", verifyAccessToken, async (req, res) => {
  try {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        if (role === "user") {
          const data = await Demande.find({ userInfos: response.data.email });
          res.status(200).json(data);
        }
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

router.get("/filter/ofdem", verifyAccessToken, async (req, res) => {
  try {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        if (role === "user") {
          //let offreModel = await Offre.findById(offre);
          const DemandeData = await Demande.aggregate([
            { $match: { userInfos: response.data.email } },
          ]);
          const OffreData = await Offre.find({ status: "published" });
          var list = [];

          OffreData.forEach(async (offre, index) => {
            if (DemandeData.length === 0) {
              var dems = { offre, exist: false };
              list.push(dems);
            } else {
              var a = await demandeParcour(DemandeData, {
                offre,
                exist: false,
              });
              list.push(a);
            }
            if (index === OffreData.length - 1) {
              res.status(200).json(list);
            }
          });
        }
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

const demandeParcour = (DemandeData, offre) =>
  new Promise((resolve, reject) => {
    for (let i = 0; i < DemandeData.length; i++) {
      const demande = DemandeData[i];
      if (demande.offre.toString() === offre.offre._id.toString()) {
        /*         
        console.log("=IF-TRUE=");
        console.log(offre.offre._id);
        console.log(demande.offre);
        console.log("========="); */
        var a = { offre: offre.offre, exist: true };
        return resolve(a);
      }
    }
    return resolve(offre);
  });

module.exports = router;
