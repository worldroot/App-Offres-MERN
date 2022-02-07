const User = require('../User')

module.exports = async function (req, res, next, userId) {
    try {
        // Get user information by Id
        const user = await User.findOne(userId)
        console.log(user)
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