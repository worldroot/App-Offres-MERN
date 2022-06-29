"use strict";

const mongoose = require("mongoose");
const dbHandler = require("./db-handler");
require("dotenv").config();

const service = require("./test-service");
const Model = require("../models/Notif");

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
describe("Notification getById ", () => {
  it("should return null if nothing is found", async () => {
    await expect(
      service.getByIdNotif(mongoose.Types.ObjectId())
    ).resolves.toBeNull();
  });
  it("should retrieve correct notification if id matches", async () => {
    const notif = await service.getByIdNotif(ID);

    expect(notif.id).toBe(ID);
    expect(notif.title).toBe(notif.title);
  });
});

//Exp
const createDem = async () => {
  const created = await Model.create(N1);
  ID = created.id;
  await Model.create(N2);
};

let ID;

const N1 = {
  title: "T1",
};
const N2 = {
  title: "T2",
};
