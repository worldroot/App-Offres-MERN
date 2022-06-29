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
describe("Create Notif", () => {
  it("can be created correctly", async () => {
    await expect(async () => service.createNotif(CompleteNotif)).not.toThrow();
  });
});

//Exp
const CompleteNotif = {
  title: "Test",
};
