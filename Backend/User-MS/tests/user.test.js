'use strict';

const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
require('dotenv').config()

const UserService = require('../controller/user-fortest')

/**
 * Connect to a new in-memory database before running any tests.
 */
 beforeAll(async () => {
    await dbHandler.connect();
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

describe('User Register ', () => {

    it('can be created correctly', async () => {
        await expect(async () => UserService.create(userComplete))
            .not
            .toThrow();
    });

});

describe('Tokens ', () => {

    it('can be created correctly', async () => {
        await expect(async () => UserService.createTokens(userComplete))
            .not
            .toThrow();
    });

});


//Exp
const userComplete = {
    nom: 'testNom',
    prenom: 'testPrenom',
    email: '@test',
    password: process.env.RANDOM_PASSWORD
};
