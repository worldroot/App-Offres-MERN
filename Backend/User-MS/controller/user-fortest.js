'use strict';

const userModel = require('../models/User');
const { signAccessToken, signRefreshToken,} = require('../middleware/verify-token')

module.exports.create = async (user) => {
    if (!user)
        throw new Error('Missing User');
        await userModel.create(user);
};

module.exports.createTokens = async (user) => {
    if (!user)
        throw new Error('Missing User');

    const savedUser = await userModel.create(user);
    await signAccessToken(savedUser.id)
    await signRefreshToken(savedUser.id)

};

module.exports.getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};