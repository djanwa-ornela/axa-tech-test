const routes = require('../app/routes');
const express = require('express');
const moxios = require('moxios');
const stockUrlJsonServer = "http://127.0.0.1:3000/stocks";

const request = require('supertest');

const initRoutes = () => {
  const app = express();
  routes(app);
  return app;
}
describe('GET /stocks', () => {
  beforeEach(() => {
   moxios.install();
  });
  afterEach(() => {
   moxios.uninstall();
  }); 
  jest.setTimeout(15000);

  test('It should 200 and a parsed json with keys status and message', async () => {
    moxios.stubRequest(stockUrlJsonServer, {
      status: 200,
      response: [
        {
          "timestamp": "2022-07-01T12:23:27.109Z",
          "index": 0,
          "stocks": "19.595"
        },
        {
          "timestamp": "2022-06-30T12:23:27.114Z",
          "index": 1,
          "stocks": "16.221"
        },
        {
          "timestamp": "2022-06-29T12:23:27.114Z",
          "index": 2,
          "stocks": "21.774"  
        }]
    }); 
    const app = initRoutes();
    const response = await request(app).get('/stocks');
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toEqual("ok");
    expect(response.body.message).toHaveLength(3);

  });
  
});