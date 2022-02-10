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
              expiresIn: '2h',
              audience: userId
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
            res.status(401).json(err)
            console.log(err)
        }        
      },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {user: {id: userId}}
          const secret = process.env.REFRESH_TOKEN_SECRET
          const options = { 
            expiresIn: '48h',
            audience: userId
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
          const decoded = JWT.verify(
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
          req.user = decoded.user;

        })
      },


}