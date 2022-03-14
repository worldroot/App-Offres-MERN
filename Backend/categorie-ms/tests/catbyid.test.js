'use strict';

const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
require('dotenv').config();

const CatService = require('./test-service')
const CatModel = require('../Categorie')

/**
 * Connect to a new in-memory database before running any tests.
 */
 beforeAll(async () => {
    await dbHandler.connect();
});
 beforeEach(async () => {
    await createCategorie();
});
/**
 * Clear all test data after every test.
 */
 afterEach(async () => {
    await dbHandler.clearDatabase();
});
/**
 * Remove and close the db and server.
 */
 afterAll(async () => {
    await dbHandler.closeDatabase();
});

//Tests ... //
describe('Categorie getById ', () => {
    /**
     * Should return null if getById doesn't find any user with the provided id.
     */
    it('should return null if nothing is found', async () => {
        await expect(CatService.getById(mongoose.Types.ObjectId()))
            .resolves
            .toBeNull();
    });

    /**
     * Should return the correct user if getById finds the user with the provided id.
     */
    it('should retrieve correct categorie if id matches', async () => {
        const categorie = await CatService.getById(CatID);

        expect(categorie.id).toBe(CatID);
        expect(categorie.nomcat).toBe(cat1.nomcat);
    });
});

//Exp
 const createCategorie = async () => {
    const created = await CatModel.create(cat1);
    CatID = created.id;
    await CatModel.create(cat2);
};

let CatID;

const cat1 = {
    nomcat: 'testingOne',
};
const cat2 = {
    nomcat: 'testingTwo'
};