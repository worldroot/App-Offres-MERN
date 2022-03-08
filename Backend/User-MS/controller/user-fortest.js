'use strict';

const userModel = require('../models/User');
const { signAccessToken, 
    signRefreshToken, 
    verifyRefreshToken, 
    verifyAccessToken } = require('../middleware/verify-token')

module.exports.create = async (user) => {
    if (!user)
        throw new Error('Missing User');

    const savedUser = await userModel.create(user);
};

module.exports.createTokens = async (user) => {
    if (!user)
        throw new Error('Missing User');

    const savedUser = await userModel.create(user);
    const accessToken = await signAccessToken(savedUser.id)
    const refreshToken = await signRefreshToken(savedUser.id)

};

module.exports.getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};