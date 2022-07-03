
const NodeCache = require("node-cache");
const axios = require('axios');
const stockUrlJsonServer = " http://localhost:3000/stocks";
const myCache = new NodeCache({ stdTTL: 200 });
//axios timeout 
const apiTimeout = 1200;
const stocksKey = "stocks";
const errorKeys = {
  timeout: "timeout ",
  serverDown: "ECONNREFUSED",
  path: "failed with status code 404",
}

const stocksRoutes = (app) => {
  app.get('/stocks', checkStockInMyCache, (req, res, next) => {
    //to make this request dynamic
    let completeUrl = stockUrlJsonServer;
    const { limit } = req.query;
    //if limit value is set in the request so we request that limit value to the json sever 
    completeUrl = limit ? completeUrl + "?_limit=" + limit : completeUrl;
    axios
      .get(completeUrl, { timeout: apiTimeout })
      .then(response => {
        myCache.set(stocksKey, response.data);
        res.send({
          status: "ok",
          message: response.data
        });
      })
      .catch(error => {
        let errorMessage = "";
        if (error.message.includes(errorKeys.timeout)) {
          errorMessage = "Request failed because json server timeout exceeded";

        } else if (error.message.includes(errorKeys.serverDown)) {
          errorMessage = "Json server is down"
        }
        else if (error.message.includes(errorKeys.path)) {
          errorMessage = "the searched path is not found on the json-server "
        } else {
          errorMessage = error.message
        }
        res.send({
          status: "ko",
          error: errorMessage
        })
      });
  })
};

//this function check if we have data with key <<stocks>> in cache and then send it as api response 
const checkStockInMyCache = (req, res, next) => {
  try {
    if (myCache.has(stocksKey)) {
      return res.status(200).json({
        status: "ok",
        message: myCache.get(stocksKey)
      });
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = stocksRoutes;