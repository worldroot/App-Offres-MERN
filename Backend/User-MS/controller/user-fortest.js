'use strict';

const userModel = require('../models/User');
const { signAccessToken, signRefreshToken,} = require('../middleware/verify-token')

module.exports.create = async (user) => {
        try {
            await userModel.create(user);
        } catch (error) {
            console.log(error)
        }
       
};

module.exports.createTokens = async (user) => {
    try {
        const savedUser = await userModel.create(user);
        await signAccessToken(savedUser.id)
        await signRefreshToken(savedUser.id)
    } catch (error) {
        console.log(error)
    }
   
};

module.exports.getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};