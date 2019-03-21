//TODO: test the db stuff by adding a record then finding a record with the same ID
//TODO: use the correct error codes and messages in all rejected promises
//TODO: conver this to ansyc/await
//TODO: determine which errors need to be console.logged and which need to be sent to the client

const config = require('config');
const express = require('express');
const expressValidator = require('express-validator');
const app = express();

const List = require('./models');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const util = require('util');
const tasks = require('./routes/task-router');
const lists = require('./routes/list-router');
const subtasks = require('./routes/subtask-router');
const config = require('config');

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', tasks);
app.use('/', lists);
app.use('/', subtasks);

mongoose.connect(config.mongo.uri, config.mongo.options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.listen(config.port, function() {
  console.log(`Express started on http://localhost:${config.port}; press Ctrl-C to terminate.`);
});

module.exports = app;
