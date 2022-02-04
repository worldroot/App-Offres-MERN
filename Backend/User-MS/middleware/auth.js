const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token, auth denied'
        })
    }

    try {

        const decoded = jwt.verify(token, "SECRET")
        req.user = decoded.user;
        next()

    } catch (error) {
        
        req.status(401).json({
            msg: 'Token is not valid'
        })
    }
}