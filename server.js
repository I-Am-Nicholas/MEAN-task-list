const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./controllers/index');//home page
const tasks = require('./controllers/tasks');//api to connect to mongo db

const app = express();

const portNumber = 3200;

//View engine
app.set('views', path.join(__dirname, 'views'));//let system know which folder our views will be in
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Static folder for Angular
app.use(express.static(path.join(__dirname, 'public')));

//Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Routing
app.use('/', index);
app.use('/api', tasks);

const server = app.listen(portNumber, () => {
  const port = server.address().port;
  console.log('App is listening at port %s', port);
});

module.exports = server;
