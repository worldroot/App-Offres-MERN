const express = require('express');
const router = express.Router()
const Category = require('./Categorie')
const SuperAdminAccess = require('../user-ms/middleware/superadminAuth')
const AdminAccess = require('../user-ms/middleware/adminAuth')
const catid = require('./categorieByid')
const { signAccessToken } = require('../user-ms/middleware/verify-token')
const { check, validationResult } = require('express-validator')

// @route   POST api/categorie
// @desc    Create Category
// @access  Private Admin
router.post('/', 
    [ check('nomcat', 'Name is required').trim().not().isEmpty()]
    ,SuperAdminAccess
    ,async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { nomcat } = req.body
    try {
        let category = await Category.findOne({ nomcat })

        if (category) {
            return res.status(403).json({
                error: 'Category already exist'
            })
        }

        const newCategory = new Category({ nomcat })
        category = await newCategory.save()
        console.log('CAT +')
        res.json(category)
    } catch (error) {
        console.log(error)
        
    }
})

// @route   Get api/categorie/all
// @desc    Get all categories
// @access  Public
router.get('/all', async (req, res) => {
    try {
        let data = await Category.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

// @route   Get api/categorie/:categoryId
// @desc    Get Single category
// @access  Public
router.get('/:categoryId', catid, async (req, res) => {
    res.json(req.category)
})

// @route   Put api/categorie/:categoryId
// @desc    Update Single category
// @access  Private super Admin
router.put('/:categoryId', 
    catid,
    SuperAdminAccess,

    async (req, res) => {

    let category = req.category;
    const { nomcat } = req.body
    if (nomcat) category.nomcat = nomcat.trim()

    try {
        category = await category.save()
        res.json(category)
        console.log(category.nomcat)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})

// @route   Delete api/categorie/:categoryId
// @desc    Delete Single category
// @access  Private super Admin
router.delete('/:categoryId',
    catid,
    SuperAdminAccess,
    AdminAccess,

    async (req, res) => {

    let category = req.category;
    try {
        let deletedCategory = await category.remove()
        res.json({
            message: `${deletedCategory.nomcat} deleted successfully`
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})


module.exports = router