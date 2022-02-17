const JWT = require('jsonwebtoken')
const User = require('../User')
const createError = require('http-errors')

module.exports = {

    signAccessToken: (userId) => {
        
        return new Promise((resolve) => {
            const payload = {user: {id: userId}}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
              expiresIn: '24h',
              audience: userId
            }
            
            JWT.sign(payload, secret, options, (err, token) => {
              
              if (err) {
                console.log(err)
                return
              }
              //resolve([token , options.expiresIn])
               resolve(token)
            })
             
          })    
      },

      ExpAccessToken: (userId) => {
        
        return new Promise((resolve) => {
            const payload = {user: {id: userId}}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
              expiresIn: '24h',
              audience: userId
            }
            
            JWT.sign(payload, secret, options, (err, token) => {
              
              if (err) {
                console.log(err)
                return
              }
              resolve(options.expiresIn)
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
            res.status(403).json(err)
            console.log(err)
        }        
      },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {user: {id: userId}}
          const secret = process.env.REFRESH_TOKEN_SECRET
          const options = { 
            expiresIn: '72h',
            audience: userId
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err)
              reject(token)
            }
            //resolve([token, options.expiresIn])
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
              resolve(userId)
            }
          )
          
        })
      },


}