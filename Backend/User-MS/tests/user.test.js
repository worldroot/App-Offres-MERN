'use strict';

const mongoose = require('mongoose');
const dbHandler = require('./db-handler');

const UserService = require('../controller/user-fortest')
const UserModel = require('../models/User')

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

describe('Creation user ', () => {

    it('can be created correctly', async () => {
        expect(async () => await UserService.create(userComplete))
            .not
            .toThrow();
    });
});

describe('Creation of tokens ', () => {

    it('can be created correctly', async () => {
        expect(async () => await UserService.createTokens(userComplete))
            .not
            .toThrow();
    });
});


//Exp
const userComplete = {
    nom: 'testNom',
    prenom: 'testPrenom',
    email: '@test',
    password: '123456'
};