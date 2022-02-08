const express = require('express')
const router = express.Router()
const Offre = require('../models/AppelOffre')
const User = require('../../user-ms/User')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const {verifyAccessToken} = require('../../user-ms/middleware/verify-token')
const { validationResult } = require('express-validator')
const verifOffre = require('../middleware/offreValidator')



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname + '../../../../') + '/Frontend/uploads');
    },  
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }


let upload = multer({ storage, fileFilter });


// @route   POST api/appeloffre
// @desc    Create appel offre
// @access  Private Admin
router.post('/',
    upload.any(),
    verifyAccessToken,
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(402).json({ error: errors.array()[0].msg })
        }

    let {titre, description, dateDebut, dateFin, category, postedBy } = req.body;
    let images = req.files;
     try {
         let allimages = []
         for(const img of images){
             allimages.push(img.filename)
         }

         let newAO = new Offre({
             image: allimages,
             titre,
             description,
             dateDebut,
             dateFin,
             category,
             postedBy
         });

         let save = newAO.save();
         if(save){
            res.json({
                message: `${newAO.titre} added successfully`
            })
         }
     } catch (error) {
         console.log(error)
         res.status(500).send('Server error');
     }


    })


module.exports = router