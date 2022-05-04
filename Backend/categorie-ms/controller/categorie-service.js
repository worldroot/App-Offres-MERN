const express = require("express");
const router = express.Router();
const Category = require("../models/Categorie");
const { verifyAccessToken } = require("../middleware/verify-token");
const catid = require("../middleware/categorieByid");
const axios = require("axios");
const { check, validationResult } = require("express-validator");

// @route   POST api/categorie
// @desc    Create Category
// @access  Private Admin
router.post(
  "/",
  [check("nomcat", "Name is required").trim().not().isEmpty()],
  verifyAccessToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;

        //Add by Super Admin Only
        if (role !== "super-admin") {
          return res.status(404).json({
            error: "Access denied",
          });
        } else {
          const { nomcat } = req.body;
          try {
            let category = await Category.findOne({ nomcat });
            if (category) {
              return res.status(403).json({
                error: true,
                msg: "Category already exist",
              });
            }
            const newCategory = new Category({ nomcat });
            category = await newCategory.save();
            res.status(200).json(category);
          } catch (error) {
            console.log(error);
            res.status(500).json({
              error: true,
              msg: "Server error",
            });
          }
        }
      });
  }
);

// @route   Get api/categorie/all
// @desc    Get all categories
// @access  Public
router.get("/all", async (req, res) => {
  try {
    let data = await Category.aggregate([
      //lookup for list :
      {
        $lookup: {
          from: "souscategories",
          localField: "_id",
          foreignField: "category",
          as: "souscategorie",
        },
      },
      //cancel some attribute to displays :
      { $project: { souscategorie: { category: 0, __v: 0 } } },
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

// @route   Put api/categorie/:categoryId
// @desc    Update Single category
// @access  Private super Admin
router.put("/:categoryId", catid, verifyAccessToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  axios
    .get("http://localhost:5001/api/user/" + req.user.id)
    .then(async (response) => {
      var role = response.data.role;

      //Update by Super Admin Only
      if (role !== "super-admin") {
        return res.status(404).json({
          error: "Super Admin resources access denied",
        });
      } else {
        let category = req.category;
        const { nomcat } = req.body;
        if (nomcat) category.nomcat = nomcat.trim();

        try {
          category = await category.save();
          res.status(200).json({
            message: `Category : ${category.nomcat} updated successfully`,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            error: true,
            msg: "Server error",
          });
        }
      }
    });
});

// @route   Delete api/categorie/:categoryId
// @desc    Delete Single category
// @access  Private super Admin
router.delete(
  "/:categoryId",
  catid,
  verifyAccessToken,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    axios
      .get("http://localhost:5001/api/user/" + req.user.id)
      .then(async (response) => {
        var role = response.data.role;

        //Delete by Super Admin Only
        if (role !== "super-admin") {
          return res.status(404).json({
            error: "Super Admin resources access denied",
          });
        } else {
          let category = req.category;
          try {
            let deletedCategory = await category.remove();
            res.status(200).json({
              message: `Category : ${deletedCategory.nomcat} deleted successfully`,
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

// @route   GET api/user
// @desc    User Information by token
// @access  Public
router.get("/find/:nomcat", async (req, res) => {
  try {
    const { nomcat } = req.category;
    const cat = await Category.findOne(nomcat);
    if (!cat) {
      return res.status(403).json({
        error: "Category not founded",
      });
    }

    res.json(cat);
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
    console.log(error.message);
  }
});

router.get("/:categoryId", catid, async (req, res) => {
  res.json(req.category);
});

module.exports = router;
