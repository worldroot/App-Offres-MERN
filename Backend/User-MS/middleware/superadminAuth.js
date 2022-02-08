const User = require('../User')
//const {verifyAccessToken} = require('./verify-token')

module.exports = async(req, res, next, ) => {
    try {
        
        const user = await User.findOne({
            _id: req.user.id
        })
        
        if (user.role !== "super-admin") {
            return res.status(403).json({
                error: 'Super Admin resources access denied'
            })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}