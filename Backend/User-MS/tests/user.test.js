'use strict';

const mongoose = require('mongoose');
const dbHandler = require('./db-handler');

const UserService = require('../controller/user-fortest')

/**
 * Connect to a new in-memory database before running any tests.
 */
 beforeAll(async () => {
    await dbHandler.connect();
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
    password: '####'
};

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