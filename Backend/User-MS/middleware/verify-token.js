const JWT = require('jsonwebtoken')
const User = require('../User')
const client = require('../middleware/redis')
const createError = require('http-errors')

module.exports = {

    signAccessToken: (userId) => {
        
        return new Promise((resolve) => {
            const payload = {user: {id: userId}}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
              expiresIn: '4h',
              audience: userId,
            }
            
            JWT.sign(payload, secret, options, (err, token) => {
              if (err) {
                console.log(err)
                return
              }
              resolve(token)
            })
          })
         
    },

    verifyAccessToken: (req, res, next) => {
        
        if (!req.headers['authorization']) return res.status(401).json({
            msg: 'No token, auth denied'
        })

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        try {
            const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = decoded.user;
            next()
        } catch (err) {
            const message =
              err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message))   
        }        
      },

    signRefreshToken: (userId) => {
        return new Promise((resolve) => {
          const payload = {user: {id: userId}}
          const secret = process.env.REFRESH_TOKEN_SECRET
          const options = {
            expiresIn: '1y',
            audience: userId,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err)
            }
            resolve(token)
            
          })
        })
      },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
          JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, payload) => {
              if (err) return reject(createError.Unauthorized())
              const userId = payload.aud
              client.GET(userId, (err, result) => {
                if (err) {
                  console.log(err.message)
                  reject(createError.InternalServerError())
                  return
                }
                if (refreshToken === result) return resolve(userId)
                reject(createError.Unauthorized())
              })
            }
          )
        })
      },


}