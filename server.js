//TODO: test the db stuff by adding a record then finding a record with the same ID
//TODO: use the correct error codes and messages in all rejected promises
//TODO: conver this to ansyc/await
//TODO: determine which errors need to be console.logged and which need to be sent to the client

const express = require('express');
const expressValidator = require('express-validator');
const app = express();
const PORT = process.env.PORT || 5000;
const List = require('./models');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const util = require('util');
const tasks = require('./routes/task-router');
const lists = require('./routes/list-router');
const subtasks = require('./routes/subtask-router');

app.set('PORT', PORT);
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', tasks);
app.use('/', lists);
app.use('/', subtasks);

let uri = 'mongodb://paspam:smashingBoxes9@ds117866.mlab.com:17866/sb-todo-app';
var options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};

//TODO: put the DB related code in a seperate file
mongoose.connect(uri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.listen(app.get('PORT'), function() {
  console.log(
    'Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.'
  );
});

module.exports = app;
