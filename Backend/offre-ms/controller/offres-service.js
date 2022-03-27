const express = require('express')
const router = express.Router()
const Offre = require('../models/Offre')
const {verifyAccessToken} = require('../middleware/verify-token')
const {validateAddOffre, isRequestValidated} = require('../middleware/offreValidator')
const axios = require('axios')
const offreByid = require('../middleware/offreByid')


// @route   POST api/appeloffre
// @desc    Create appel offre
// @access  Private Admin
router.post('/',
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

            let {titre, description, image, dateDebut, dateFin, category, postedBy } = req.body;
            
            axios.get("http://localhost:5002/api/categorie/"+category)
                 .then(async (response)=>{

                      
                    const newOffre = new Offre({
                        titre,
                        description,
                        image,
                        dateDebut,
                        dateFin,
                        category:response.data._id,
                        postedBy:req.user.id
                        });

                    let off = await Offre.findOne(newOffre.titre);
                    if (off) {
                        return res.status(400).json({
                        error: true,
                        msg: 'Offre existe déjà',
                        });
                    } 

                    newOffre.save().then(() => res.json(newOffre))
                    })
                  .catch(function(error) {
                      if(error.response){
                        res.status(400).json({
                            error: true,
                            msg: error.response.data.error
                        });
                        console.log(error.message)
                      }
                  }) 
        }
    })


})


// @route   PUT api/appeloffre
// @desc    Update appel offre
// @access  Private Admin
router.put('/:offreId',
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

            let {titre, description, image, dateDebut, dateFin, category, postedBy } = req.body;
            
            axios.get("http://localhost:5002/api/categorie/"+category)
                 .then(async (response)=>{

                    
                    let off = await Offre.findOne({titre});
                    if (off) {
                        return res.status(400).json({
                        error: true,
                        msg: 'Offre existe déjà',
                        });
                    } 

                    const updateOffre = await Offre.findByIdAndUpdate(
                        req.params.offreId,
                        { $set: {
                            titre,
                            description,
                            image,
                            dateDebut,
                            dateFin,
                            category:response.data._id,
                            postedBy:req.user.id
                            } },
                        { new: true }
                    );  
                    
                     
                    res.status(200).json(updateOffre)
                    
                    })
                  .catch(function(error) {
                      if(error.response){
                        res.status(400).json({
                            error: true,
                            msg: error.response.data.error
                        });
                        console.log(error.message)
                      }
                  }) 
        }
    })


})

// @route   Get api/offre/all
// @desc    Get all offre
// @access  Public
router.get('/all', async (req, res) => {
    try {
        let data = await Offre.find({}) 
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            msg:'Server error'
          });
    }
})





module.exports = router