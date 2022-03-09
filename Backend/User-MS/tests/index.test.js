const request =  require('supertest')
const server =  require('../index')
const dbHandler = require('./db-handler');

/**
 * Clear all test data after every test.
 */
 afterEach(async () => {
    await dbHandler.clearDatabase();
});


describe('Get Endpoints', () => {

    it('Get', async () => {
        await expect(async () => await request(server).get('/test').send('Testing'))
            .not
            .toThrow();
    });

})

/**
 * Remove and close the db and server.
 */
 afterAll(async () => {
    await dbHandler.closeDatabase();
});

