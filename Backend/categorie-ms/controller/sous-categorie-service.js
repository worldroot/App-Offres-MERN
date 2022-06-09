const express = require('express');
const router = express.Router()
const SousCategory = require('../models/Sous-categorie')
const Category = require('../models/Categorie')
const {verifyAccessToken} = require('../middleware/verify-token')
const catid = require('../middleware/souscategorieByid')
const axios = require('axios')
const { check, validationResult } = require('express-validator')

// @route   POST api/categorie
// @desc    Create Category
// @access  Private Admin
router.post('/', 
    [ check('category', 'category is required').trim().not().isEmpty()],
    [ check('sousnomcat', 'sousnomcat is required').trim().not().isEmpty()]
    ,verifyAccessToken 
    ,async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    axios.get("http://localhost:5001/api/user/"+req.user.id)
    .then(async (response)=>{
        var role = response.data.role
        
        //Add by Super Admin Only
        if (role !== 'super-admin') {
            return res.status(404).json({
                error: 'Access denied'
            })

        }else{
             
            const { sousnomcat, category, catref } = req.body
            try {
                let categoryModel = await Category.findById(category)
                if (!categoryModel) {
                    return res.status(403).json({
                        error: true,
                        msg: 'Category doesnt exist'
                    })
                }
                let souscategory = await SousCategory.findOne({ sousnomcat })
                if (souscategory) {
                    return res.status(403).json({
                        error: true,
                        msg: 'Sous-Category already exist'
                    })
                }
                const newCategory = new SousCategory({ category,sousnomcat, catref:categoryModel.nomcat })
                souscategory = await newCategory.save()
                res.status(200).json(souscategory)
          
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    error: true,
                    msg:'Server error'
                  });
            }

        }
    })

})

// @route   Get api/categorie/all
// @desc    Get all categories
// @access  Public
router.get('/all', async (req, res) => {
    try {
        let data = await SousCategory.find({})
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            msg:'Server error'
          });
    }
})


// @route   Put api/categorie/:categoryId
// @desc    Update Single category
// @access  Private super Admin
router.put('/:categoryId', 
    catid,
    verifyAccessToken,
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg })
        }
    
        axios.get("http://localhost:5001/api/user/"+req.user.id)
        .then(async (response)=>{
            var role = response.data.role
            
            //Update by Super Admin Only
            if (role !== 'super-admin') {
                return res.status(404).json({
                    error: 'Super Admin resources access denied'
                })
    
            }else{

                let category = req.category;
                const { sousnomcat } = req.body
                if (sousnomcat) category.sousnomcat = sousnomcat.trim()

                try {
                    category = await category.save()
                    res.status(200).json({
                        message: `Sous-Category : ${category.sousnomcat} updated successfully`
                    })
                    
                    } catch (error) {
                        console.log(error)
                        res.status(500).json({
                            error: true,
                            msg:'Server error'
                          });
                    }
            }
        })


})

// @route   Delete api/categorie/:categoryId
// @desc    Delete Single category
// @access  Private super Admin
router.delete('/:categoryId',
    catid,
    verifyAccessToken,

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg })
        }
    
        axios.get("http://localhost:5001/api/user/"+req.user.id)
        .then(async (response)=>{
            var role = response.data.role
            
            //Delete by Super Admin Only
            if (role !== 'super-admin') {
                return res.status(404).json({
                    error: 'Super Admin resources access denied'
                })
    
            }else{
                 
            
                let category = req.category;
                try {
                    let deletedCategory = await SousCategory.deleteOne(category)
                    res.status(200).json({
                        message: `Category : ${deletedCategory.sousnomcat} deleted successfully`
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

router.get('/:categoryId', catid, async (req, res) => {
    res.json(req.category)
})


module.exports = router