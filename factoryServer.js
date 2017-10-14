function makeServer() {
  const express = require('express');
  const app = express();
  const path = require('path');
  const bodyParser = require('body-parser');

  const index = require('./controllers/index');//home page
  const tasks = require('./controllers/tasks');//api to connect to mongo db

  //Routing
  app.use('/', index);
  app.use('/api', tasks);

  //View engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);

  //Parser MiddleWare
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));

  var server = app.listen(3000, () => {
    var port = server.address().port;
    console.log('App is listening at port %s', port);
  });

  return server;
}

module.exports = makeServer;
