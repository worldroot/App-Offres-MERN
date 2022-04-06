const express = require("express");
const router = express.Router();
const Offre = require("../models/Offre");
const { verifyAccessToken } = require("../middleware/verify-token");
const {
  validateAddOffre,
  isRequestValidated,
} = require("../middleware/offreValidator");
const axios = require("axios");
const offreByid = require("../middleware/offreByid");

// @route   POST api/appeloffre
// @desc    Create appel offre
// @access  Private Admin
router.post(
  "/",
  verifyAccessToken,
  validateAddOffre,
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (responseUser) => {
        var role = responseUser.data.role;
        if (role !== "admin") {
          return res.status(404).json({
            error: "Access Denied !!",
          });
        } else {
          try {
            let {
              titre,
              description,
              image,
              dateDebut,
              dateFin,
              souscategory,
              prixdebut,
              category,
              status,
              postedBy,
            } = req.body;

            var date = new Date();
            const Debut = new Date(dateDebut);
            const Fin = new Date(dateFin);
            const DateToCheck = new Date(date.getTime());

            const off = await Offre.findOne({ titre });
            if (off) {
              return res.status(400).json({
                error: true,
                msg: "Offre existe déjà",
              });
            }
            axios
              .get("http://localhost:5002/api/sous-categorie/" + souscategory)
              .then((response) => {
                axios
                  .get(
                    "http://localhost:5002/api/categorie/" +
                      response.data.category
                  )
                  .then((response2) => {
                    if (DateToCheck > Debut && DateToCheck < Fin) {
                      const newOffre = new Offre({
                        titre,
                        description,
                        image,
                        dateDebut,
                        dateFin,
                        prixdebut,
                        category: response2.data.nomcat,
                        souscategory: response.data.sousnomcat,
                        postedBy: responseUser.data.email,
                        status: "published",
                      });
                      newOffre.save().then(() => res.json(newOffre));
                    } else {
                      const newOffre = new Offre({
                        titre,
                        description,
                        image,
                        dateDebut,
                        dateFin,
                        prixdebut,
                        category: response2.data.nomcat,
                        souscategory: response.data.sousnomcat,
                        postedBy: responseUser.data.email,
                        status: "pending",
                      });
                      newOffre.save().then(() => res.json(newOffre));
                    }
                  });
              });
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

// @route   PUT api/appeloffre
// @desc    Update appel offre
// @access  Private Admin
router.put(
  "/:offreId",
  verifyAccessToken,
  validateAddOffre,
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        let {
          titre,
          description,
          image,
          dateDebut,
          dateFin,
          souscategory,
          category,
          status,
          prixdebut,
        } = req.body;
        var date = new Date();
        const OF = await Offre.findById(req.params.offreId);
        const Debut = new Date(OF.dateDebut);
        const Fin = new Date(OF.dateFin);
        const DateToCheck = new Date(date.getTime());

        if (role === "admin") {
          //Update by Admin Only
          try {
            // Between dates : DateToCheck > Debut && DateToCheck<Fin
            if (DateToCheck < Debut) {
              
              const updateOffre = await Offre.findByIdAndUpdate(
                req.params.offreId,
                {
                  $set: {
                    titre,
                    description,
                    image,
                    dateDebut,
                    dateFin,
                    prixdebut,
                    souscategory,
                    category,
                    status,
                  },
                },
                { new: true }
              );

              res.status(200).json(updateOffre);
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

// @route   Delete api/offre/:categoryId
// @desc    Delete Single offre
// @access  Private super Admin
router.delete(
  "/:offreId",
  offreByid,
  verifyAccessToken,
  isRequestValidated,
  async (req, res) => {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        var date = new Date();
        const OF = await Offre.findById(req.params.offreId);
        const Debut = new Date(OF.dateDebut);
        const Fin = new Date(OF.dateFin);
        const DateToCheck = new Date(date.getTime());
        let offre = req.offre;

        if (role === "admin") {
          if (DateToCheck < Debut) {
            try {
              let deletedOffre = await offre.remove();
              res.status(200).json({
                message: `Offre : ${deletedOffre.titre} deleted successfully`,
              });
            } catch (error) {
              console.log(error.message);
              res.status(500).json({
                error: true,
                msg: "Server error",
              });
            }
          } else {
            res.status(400).json({
              error: true,
              msg: `Suppression avant '${Debut.toDateString()}' est impossible !`,
            });
          }
        } else if (role === "super-admin") {
          if (DateToCheck < Debut) {
            try {
              let deletedOffre = await offre.remove();
              res.status(200).json({
                msg: `Offre : ${deletedOffre.titre} deleted successfully`,
              });
            } catch (error) {
              console.log(error.message);
              res.status(500).json({
                error: true,
                msg: "Server error",
              });
            }
          } else if (DateToCheck > Debut && DateToCheck < Fin) {
            const updateOffre = await Offre.findByIdAndUpdate(
              req.params.offreId,
              { $set: { status: "archived" } },
              { new: true }
            );

            res.status(200).json(updateOffre);
          } else {
            res.status(400).json({
              error: true,
              msg: `Suppression avant '${Debut.toDateString()}' est impossible !`,
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
    const data = await Offre.find({});
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
