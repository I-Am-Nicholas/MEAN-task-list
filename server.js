const express = require('express')

const path = require('path')
const bodyParser = require('body-parser')
//FILES ROUTED TO
const index = require('./controllers/index') //home page
const routes = require('./controllers/routes')

const app = express()

const portNumber = process.env.NODE_ENV == 'Test' ? 3200 : 3000

//View engine
app.set('views', path.join(__dirname, 'views')) //let system know which folder our views will be in
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

//Static folder for Angular
app.use(express.static(path.join(__dirname, 'client/task-list/dist')))

app.get('*'), (req, res) => {
  res.sendFile(path.join(__dirname, 'client/task-list/dist/index.html'))
}

//Parser MiddleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

//Routing
app.use('/', index)
app.use('/api', routes)

//Server
var server = app.listen(portNumber, function () {
  var port = server.address().port
  console.log('App listening at port %s', port)
})

module.exports = server
