const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swagger= (app) => {
  app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
module.exports = swagger;