const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");
const Offre = require("../models/Offre");
const axios = require("axios");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 384 });
const { emailKey, emailDem } = require("../middleware/demandeMailer");
const {
  ToCrypte,
  ToDecrypte,
  PrivateKey,
  PublicKey,
} = require("../middleware/Cryptage");
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
    await axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (responseUser) => {
        var role = responseUser.data.role;
        var date = new Date();
        const DateToCheck = new Date(date.getTime());
        const Today = DateToCheck.toISOString().substring(0, 10);

        if (role !== "user") {
          return res.status(404).json({
            error: "Access Denied !!",
          });
        } else {
          try {
            let { offre, prix } = req.body;
            const props = {
              prix: prix,
              userEmail: responseUser.data.email,
              userTel: responseUser.data.telephone,
              userId: responseUser.data._id,
            };

            let offreModel = await Offre.findById(offre);
            const Debut = new Date(offreModel.dateDebut);
            const Fin = new Date(offreModel.dateFin);
            const FinDate = Fin.toISOString().substring(0, 10);
            const ResDep = offreModel.responsable;
            const Admin = offreModel.postedBy;
            const theKey = offreModel.publickey;
            if (!offreModel) {
              return res.status(403).json({
                error: true,
                msg: "Offre doesnt exist",
              });
            } else {
              if (DateToCheck > Debut && DateToCheck < Fin) {
                const pDem = parseFloat(prix);
                const pOffre = parseFloat(offreModel.prixdebut);
                if (pDem < pOffre) {
                  return res.status(403).json({
                    error: true,
                    msg: "V??rifier votre prix",
                  });
                } else {
                  const rs = JSON.stringify(props);

                  if (theKey === "" || !theKey) {
                    await Offre.findByIdAndUpdate(
                      offre,
                      { $set: { publickey: PublicKey } },
                      { new: true }
                    );

                    //Email-ResDep
                    await axios
                      .get("http://localhost:5001/api/user/" + ResDep)
                      .then(async (resdep) => {
                        console.log(resdep.data.email);
                        await emailKey(
                          resdep.data.email,
                          PrivateKey,
                          `D??cryptage cl?? pour l'offre: ${offreModel.titre}`,
                          offreModel._id,
                          offreModel.titre
                        );
                      });

                    //Email-Client
                    await emailDem(
                      responseUser.data.email,
                      offreModel.titre,
                      FinDate,
                      props.prix,
                      Today,
                      responseUser.data.nom
                    );

                    //Notif-Ad
                    await axios
                      .get("http://localhost:5001/api/user/" + Admin)
                      .then(async (ad) => {
                        const Adminbody = {
                          postedBy: ad.data._id,
                          titre: offreModel.titre,
                          date: Today,
                          array: ad.data.OneSignalID,
                        };
                        await axios.post(
                          "http://localhost:5004/api/notif/new",
                          Adminbody
                        );
                      });

                    //Notif-Client
                    const Clientbody = {
                      userId: responseUser.data._id,
                      titre: offreModel.titre,
                      array: responseUser.data.OneSignalID,
                      date: Today,
                    };
                    await axios.post(
                      "http://localhost:5004/api/notif/demande",
                      Clientbody
                    );

                    const encrypted = ToCrypte(PublicKey, rs);
                    const newDem = new Demande({
                      offre,
                      properties: encrypted,
                    });

                    newDem.save().then(() => res.json(newDem));
                  } else {
                    //Email-Client
                    await emailDem(
                      responseUser.data.email,
                      offreModel.titre,
                      FinDate,
                      props.prix,
                      Today,
                      responseUser.data.nom
                    );

                    //Notif-Client
                    const Clientbody = {
                      userId: responseUser.data._id,
                      titre: offreModel.titre,
                      array: responseUser.data.OneSignalID,
                      date: Today,
                    };
                    await axios.post(
                      "http://localhost:5004/api/notif/demande",
                      Clientbody
                    );

                    //Notif-Ad
                    await axios
                    .get("http://localhost:5001/api/user/" + Admin)
                    .then(async (ad) => {
                      const Adminbody = {
                        postedBy: ad.data._id,
                        titre: offreModel.titre,
                        date: Today,
                        array: ad.data.OneSignalID,
                      };
                      await axios.post(
                        "http://localhost:5004/api/notif/new",
                        Adminbody
                      );
                    });

                    const encrypted = ToCrypte(theKey, rs);
                    const newDem = new Demande({
                      offre,
                      properties: encrypted,
                    });
                    
                    newDem.save().then(() => res.json(newDem));
                  }
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
  "/:offreId",
  verifyAccessToken,
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        const OF = await Offre.findById(req.params.offreId);

        if (role === "admin") {
          //Update by Admin Only
          try {
            if (OF.status === "closed") {
              const DemandeList = await Demande.find({
                offre: req.params.offreId,
              });
              var list = [];
              var { key } = req.body;
              DemandeList.forEach(async (dem, index) => {
                const decrypted = ToDecrypte(key, dem.properties);
                const result = JSON.parse(decrypted);
                const up = await Demande.findByIdAndUpdate(
                  dem._id,
                  { $set: { properties: result, etat: "Ouvert" } },
                  { new: true }
                );
                list.push(up);

                if (index === DemandeList.length - 1) {
                  res.status(200).json(list);
                }
              });
              await Offre.findByIdAndUpdate(
                req.params.offreId,
                { $set: { status: "r??sultats" } },
                { new: true }
              );
            } else {
              res.status(401).json({
                error: true,
                msg: "D??cryptage Impossible: v??rifier votre cl?? !",
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
    const data = await Demande.find({}).select("-properties");
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
          const data = await Demande.find({
            propperties: { userInfos: response.data.email },
          }).populate({ path: "offre" });
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
      
          const DemandeData = await Demande.aggregate([
            { $match: { propperties: { userInfos: response.data.email } } },
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
        var a = { offre: offre.offre, exist: true };
        return resolve(a);
      }
    }
    return resolve(offre);
  });

module.exports = router;
