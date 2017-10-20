const mongoose = require('mongoose');
var append;

//DATABASE CONNECTION
process.env.NODE_ENV == 'Test' ? append = '-test' : append = '';

module.exports = mongoose.connection.openUri('mongodb://localhost/task-list'+append)
