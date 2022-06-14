"use strict";

const mongoose = require("mongoose");
const dbHandler = require("./db-handler");
require("dotenv").config();

const service = require("./test-service");
const demModel = require("../models/Demande");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await dbHandler.connect();
});
beforeEach(async () => {
  await createDem();
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
describe("Demande getById ", () => {
  it("should return null if nothing is found", async () => {
    await expect(
      service.getByIdDemande(mongoose.Types.ObjectId())
    ).resolves.toBeNull();
  });
  it("should retrieve correct demande if id matches", async () => {
    const demande = await service.getByIdDemande(demID);

    expect(demande.id).toBe(demID);
    expect(demande.offre).toBe(demande.offre);
  });
});

//Exp
const createDem = async () => {
  const created = await demModel.create(dem1);
  demID = created.id;
  await demModel.create(dem2);
};

let demID;

const dem1 = {
  offre: "62990a5978f6258713d62280",
  properties: {
    prix: 400,
  },
};
const dem2 = {
  offre: "62990aed78f6258713d6228c",
  properties: {
    prix: 400,
  },
};
