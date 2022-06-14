'use strict';

const demModel = require('../models/Demande');
const offreModel = require('../models/Offre');

module.exports.createDem = async (dem) => {
    if (!dem)
        throw new Error('Missing Demande');
        await demModel.create(dem);
};

module.exports.createOffre = async (off) => {
    if (!off)
        throw new Error('Missing Offre');
        await offreModel.create(off);
};

module.exports.getByIdOffre = async (id) => {
    const dem = await offreModel.findById(id);
    return dem;
};

module.exports.getByIdDemande = async (id) => {
    const off = await demModel.findById(id);
    return off;
};