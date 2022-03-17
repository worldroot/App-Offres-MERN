'use strict';

const catModel = require('../models/Categorie');

module.exports.create = async (cat) => {
    if (!cat)
        throw new Error('Missing User');
        await catModel.create(cat);
};

module.exports.getById = async (id) => {
    const cat = await catModel.findById(id);
    return cat;
};