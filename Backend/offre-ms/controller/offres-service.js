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
        if ( role !== 'admin' ) {
            return res.status(404).json({
                error: 'Access Denied !!'
            })

        }else{
            try {

                let {titre, description, image, dateDebut, dateFin, souscategory, status, postedBy } = req.body;

                const off = await Offre.findOne({titre});
                if (off) {
                    return res.status(400).json({
                    error: true,
                    msg: 'Offre existe déjà',
                    });
                } 
                const newOffre = new Offre({
                    titre,
                    description,
                    image,
                    dateDebut,
                    dateFin,
                    souscategory,
                    postedBy:req.user.id,
                    status
                    });

                newOffre.save().then(() => res.json(newOffre))
                
            } catch (error) {
                res.status(500).json({
                    error: true,
                    msg: 'server error'
                });
                console.log(error)
            }
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
        if (role !== 'super-admin') {
            return res.status(404).json({
                error: 'Access Denied !!'
            })

        }else{

            let {titre, description, image, dateDebut, dateFin, category, postedBy } = req.body;
            const off = await Offre.findOne({titre});
            if (off) {
                return res.status(400).json({
                error: true,
                msg: "Titre d'offre existe déjà",
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
                    category,
                    postedBy:req.user.id
                    }
                  },
                { new: true }
            ); 
            
            res.status(200).json(updateOffre)
        }
    })


})

// @route   Delete api/categorie/:categoryId
// @desc    Delete Single category
// @access  Private super Admin
router.delete('/:offreId',
    offreByid,
    verifyAccessToken,
    isRequestValidated,
    async (req, res) => {
    
        axios.get("http://localhost:5001/api/user/"+req.user.id)
        .then(async (response)=>{
            var role = response.data.role
            
            //Delete by Super Admin Only
            if (role !== 'super-admin') {
                return res.status(404).json({
                    error: 'Super Admin resources access denied'
                })
    
            }else{
                 
                let offre = req.offre;
                try {
                    let deletedOffre = await offre.remove()
                    res.status(200).json({
                        message: `Offre : ${deletedOffre.titre} deleted successfully`
                    })
                    } catch (error) {
                        console.log(error.message)
                        res.status(500).json({
                            error: true,
                            msg:'Server error'
                          });
                    }
                
            }
        })
    
})


// @route   Get api/offre/all
// @desc    Get all offre
// @access  Public
router.get('/all', async (req, res) => {
    try {

          const data = await Offre.find({})
             const catData = data.map( ({souscategory}) => {
              
                axios.get("http://localhost:5002/api/sous-categorie/"+souscategory)
                .then(async (response)=>{
                    
                    res.status(200).json(response.data.sousnomcat)
                })
          })
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            msg:'Server error'
          });
    }

})


module.exports = router