const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');//home page
const tasks = require('./routes/tasks');//api to connect to mongo db

const app = express();

const port = 3000;

//View engine
app.set('views', path.join(__dirname, 'views'));//let system know which folder our views will be in
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Static folder for Angular
app.use(express.static(path.join(__dirname, 'client-side')));

//Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Routing
app.use('/', index);
app.use('/api', tasks);

app.listen(port, () => {
  console.log('Server started on port: '+port);
});
