const User = require('../User')

module.exports = async function (req, res, next) {
    try {
        // Get user information by Id
        const user = await User.findOne({
            _id: req.user.id
        })

        if (req.user.role !== "super-admin") {
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