'use strict';

const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
require('dotenv').config();

const UserService = require('../controller/user-fortest')
const UserModel = require('../models/User')

/**
 * Connect to a new in-memory database before running any tests.
 */
 beforeAll(async () => {
    await dbHandler.connect();
});
 beforeEach(async () => {
    await createUser();
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
describe('User getById ', () => {
    /**
     * Should return null if getById doesn't find any user with the provided id.
     */
    it('should return null if nothing is found', async () => {
        await expect(UserService.getById(mongoose.Types.ObjectId()))
            .resolves
            .toBeNull();
    });

    /**
     * Should return the correct user if getById finds the user with the provided id.
     */
    it('should retrieve correct user if id matches', async () => {
        const user = await UserService.getById(UserId);

        expect(user.id).toBe(UserId);
        expect(user.nom).toBe(user1.nom);
    });
});

//Exp
 const createUser = async () => {
    const created = await UserModel.create(user1);
    UserId = created.id;
    await UserModel.create(user2);
};

let UserId;

const user1 = {
    nom: 'testNom',
    prenom: 'testPrenom',
    email: '@test',
    password: 'gh12345678'
};
const user2 = {
    nom: 'Test2',
    prenom: 'Test2',
    email: '2@test',
    password: 'gh12347856'
};