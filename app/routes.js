// import other routes
const stocksRoutes = require('./stocks');

const appRouter = (app) => {

    // default route
    app.get('/', (req, res) => {
        res.send('hello from axa`s technical test server');
    });
    // // other routes
    stocksRoutes(app);
    

};

module.exports = appRouter;