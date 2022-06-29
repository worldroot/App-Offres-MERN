'use strict';

const Model = require('../models/Notif');

module.exports.createNotif = async (n) => {
    if (!n)
        throw new Error('Missing Notification');
        await Model.create(n);
};

module.exports.getByIdNotif = async (id) => {
    const n = await Model.findById(id);
    return n;
};