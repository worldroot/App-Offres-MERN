"use strict";

const mongoose = require("mongoose");
const dbHandler = require("./db-handler");
require("dotenv").config();

const service = require("./test-service");
const offreModel = require("../models/Offre");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await dbHandler.connect();
});
beforeEach(async () => {
  await createOffre();
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
describe("Offre getById ", () => {
  it("should return null if nothing is found", async () => {
    await expect(
      service.getByIdOffre(mongoose.Types.ObjectId())
    ).resolves.toBeNull();
  });
  it("should retrieve correct offre if id matches", async () => {
    const offre = await service.getByIdOffre(offID);

    expect(offre.id).toBe(offID);
    expect(offre.titre).toBe(offre.titre);
  });
});

//Exp
const createOffre = async () => {
  const created = await offreModel.create(offre1);
  offID = created.id;
  await offreModel.create(offre2);
};

let offID;

const offre1 = {
    titre: 'Test',
    description: 'testing...',
    image: '',
    dateDebut: '2022-06-06',
    dateFin: '2022-06-30',
    souscategory: 'x',
    postedBy: 'x',
};
const offre2 = {
    titre: 'Test34',
    description: 'testing....',
    image: 'we',
    dateDebut: '2022-06-06',
    dateFin: '2022-06-30',
    souscategory: 'x2',
    postedBy: 'x2',
};
