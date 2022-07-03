//import express from "express";
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swagger = require('./swagger/index');
const host = 'localhost';

const port = 4000;
// we set timeout to 10s
const timeout = 100000;

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(cors());
swagger(app);

require('./app/routes.js')(app);
app.listen(port,host ,() => {
  console.log(`Server started ➜ http://localhost:${port}`);
});
