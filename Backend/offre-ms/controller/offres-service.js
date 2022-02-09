const express = require('express')
const router = express.Router()
const Offre = require('../models/Offre')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const {verifyAccessToken} = require('../../user-ms/middleware/verify-token')
const {validateAddOffre, isRequestValidated} = require('../middleware/offreValidator')
const axios = require('axios')
const offreByid = require('../middleware/offreByid')

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
    validateAddOffre,
    isRequestValidated,
    async (req, res) => {

    axios.get("http://localhost:5001/api/user/"+req.user.id)
    .then(async (response)=>{
        var role = response.data.role
        
        //Add by Super Admin Only
        if (role !== 'super-admin' && role !== 'admin' ) {
            return res.status(404).json({
                error: 'Access Denied !!'
            })

        }else{

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
                     postedBy: req.user.id
                 });
        
                 let save = newAO.save();
                 if(save){
                    res.json({
                        message: `Appel d'offre -> ${newAO.titre} added successfully`
                    })
                 }
             } catch (error) {
                 console.log(error)
                 res.status(500).send('Server error');
             }
             
           

        }
    })


})


// @route   PUT api/appeloffre
// @desc    Update appel offre
// @access  Private Admin
router.put('/offreId',
    upload.any(),
    offreByid,
    verifyAccessToken,
    validateAddOffre,
    isRequestValidated,
    async (req, res) => {

    axios.get("http://localhost:5001/api/user/"+req.user.id)
    .then(async (response)=>{
        var role = response.data.role
        
        //Add by Super Admin Only
        if (role !== 'super-admin' && role !== 'admin' ) {
            return res.status(404).json({
                error: 'Access Denied !!'
            })

        }else{

            let {titre, description, dateDebut, dateFin, category } = req.body;
            let images = req.files;
            let offre  = req.offre;

            if (titre) offre.titre = titre.trim()
            if (description) offre.description = description.trim()
            if (dateDebut) offre.dateDebut = dateDebut.toString().trim()
            if (dateFin) offre.dateFin = dateFin.toString().trim()
            if (category) offre.category = category.toString().trim()

             try {
                 let allimages = []
                 for(const img of images){
                     allimages.push(img.filename)
                 }
        
                 offre = await offre.save();
                 if(save){
                    res.json({
                        message: `Appel d'offre -> ${offre.titre} updated successfully`
                    })
                 }
             } catch (error) {
                 console.log(error)
                 res.status(500).send('Server error');
             }
             
           

        }
    })


})


module.exports = router