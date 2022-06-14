"use strict";

const mongoose = require("mongoose");
const dbHandler = require("./db-handler");
require("dotenv").config();

const service = require("./test-service");

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
describe("Create Offre", () => {
  it("can be created correctly", async () => {
    await expect(async () => service.createOffre(CompleteOffre)).not.toThrow();
  });
});


const CompleteOffre = {
    titre: 'Test',
    description: 'testing...',
    image: '',
    dateDebut: '2022-06-06',
    dateFin: '2022-06-30',
    souscategory: 'x',
    postedBy: 'x',
};
