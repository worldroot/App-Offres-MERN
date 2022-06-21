const express = require("express");
const router = express.Router();
const Offre = require("../models/Offre");
const { verifyAccessToken } = require("../middleware/verify-token");
const {
  validateAddOffre,
  isRequestValidated,
} = require("../middleware/offreValidator");
const axios = require("axios");
//const offreByid = require("../middleware/offreByid");

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
              responsable,
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
                  .then(async (response2) => {
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
                        postedBy: responseUser.data._id,
                        responsable: responsable._id,
                        status: "published",
                      });

                      const Adminbody = {
                        responsable: responsable,
                        titre: titre,
                        dateFin: dateFin,
                      };

                      if (responsable.OneSignalID) {
                        if (responsable.OneSignalID.length > 0) {
                          axios.post(
                            "http://localhost:5004/api/notif/selected",
                            Adminbody
                          );
                        }
                      }

                      const Clientbody = {
                        titre: titre,
                        dateDebut: dateDebut,
                      };
                      await axios.post(
                        "http://localhost:5004/api/notif/published-offre",
                        Clientbody
                      );

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
                        responsable: responsable._id,
                      });

                      const Adminbody = {
                        responsable: responsable,
                        titre: titre,
                        dateFin: dateFin,
                      };
                      
                      if (responsable.OneSignalID) {
                        if (responsable.OneSignalID.length > 0) {
                          axios.post(
                            "http://localhost:5004/api/notif/selected",
                            Adminbody
                          );
                        }
                      }

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
          responsable,
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
                    responsable,
                  },
                },
                { new: true }
              );
              res.status(200).json(updateOffre);
            } else if (
              DateToCheck > Debut &&
              DateToCheck < Fin &&
              OF.archived
            ) {
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
                    responsable,
                  },
                },
                { new: true }
              );
              res.status(200).json(updateOffre);
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
router.patch("/changestatus", verifyAccessToken, async (req, res) => {
  axios
    .get("http://localhost:5001/api/user/" + req.user.id)
    .then(async (response) => {
      var role = response.data.role;
      let { id, status, archived } = req.body;
      const one = await Offre.findById(id);
      var date = new Date();
      const Debut = new Date(one.dateDebut);
      const Fin = new Date(one.dateFin);
      const DateToCheck = new Date(date.getTime());
      if (role === "super-admin") {
        try {
          if (one.status === "published" && !one.archived) {
            const toArchived = await Offre.findByIdAndUpdate(
              id,
              { $set: { status: "archived", archived: true } },
              { new: true }
            );
            res.status(200).json(toArchived);
          } else {
            const toPublished = await Offre.findByIdAndUpdate(
              id,
              { $set: { status: "published", archived: false } },
              { new: true }
            );
            res.status(200).json(toPublished);
          }
        } catch (error) {
          console.log(error);
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
});

// @route   Delete api/offre/:categoryId
// @desc    Delete Single offre
// @access  Private super Admin
router.delete(
  "/:offreId",
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
              let deletedOffre = await Offre.findByIdAndDelete(
                req.params.offreId
              );
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
              let deletedOffre = await Offre.deleteOne(req.params.offreId);
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
router.get("/allpublished", async (req, res) => {
  try {
    var date = new Date();
    const DateToCheck = new Date(date.getTime());

    //DateToCheck > Debut && DateToCheck < Fin
    const offre = await Offre.find({
      archived: false,
      dateDebut: { $lt: DateToCheck },
      dateFin: { $gt: DateToCheck },
    });
    const closed = await Offre.find({ dateFin: { $lt: DateToCheck } });
    if (closed.length > 0) {
      await Offre.updateMany(
        { dateFin: { $lt: DateToCheck } },
        { $set: { status: "closed" } }
      );
      res.status(200).json(offre);
    } else {
      res.status(200).json(offre);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    const data = await Offre.aggregate([
      {
        $lookup: {
          from: "demandes",
          localField: "_id",
          foreignField: "offre",
          as: "demandes",
        },
      },
      //cancel some attribute to displays :
      { $project: { demandes: { __v: 0, updatedAt: 0 } } },
      { $project: { icon: 0, __v: 0, slug: 0 } },
    ]);

    var date = new Date();
    const DateToCheck = new Date(date.getTime());
    const closed = await Offre.find({ dateFin: { $lt: DateToCheck } });
    if (closed.length > 0) {
      await Offre.updateMany(
        { dateFin: { $lt: DateToCheck } },
        { $set: { status: "closed" } }
      );
      res.status(200).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

// @route   Get api/demandes
// @desc    Get all offres et demandes
// @access  Public
router.get("/alldemandes", async (req, res) => {
  try {
    let data = await Offre.aggregate([
      //lookup for list :
      { $match: { status: "closed" } },
      {
        $lookup: {
          from: "demandes",
          localField: "_id",
          foreignField: "offre",
          as: "demandes",
        },
      },
      //cancel some attribute to displays :
      { $project: { demandes: { __v: 0, updatedAt: 0 } } },
      { $project: { icon: 0, __v: 0, slug: 0 } },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

router.get("/offrebyuser", verifyAccessToken, async (req, res) => {
  try {
    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;
        if (role === "user") {
          let list = await Offre.aggregate([
            { $match: { userInfos: response.data.email } },
            //lookup for list :
            {
              $lookup: {
                from: "demandes",
                localField: "_id",
                foreignField: "offre",
                as: "demandes",
              },
            },
            //{$match: { demandes: { userInfos: response.data.email} }},
            //cancel some attribute to displays :
            //{ $match: { _id:  } },
            { $project: { demandes: { __v: 0, updatedAt: 0 } } },
            { $project: { icon: 0, __v: 0, slug: 0, image: 0 } },
            /* pipeline: [
              {
                $match: { userInfos: response.data.email },
              },
            ], */
          ]);
          res.status(200).json(list);
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

router.get("/one", async (req, res) => {
  try {
    const data = req.body;
    const one = await Offre.findById(data.id);
    res.status(200).json(one.dateFin.toDateString());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
