const mongoose = require('mongoose')
, async = require('async')

//DATABASE STATE
let state = {
  db: null
}

//DATABASE CONNECTION
exports.connect = (done) => {
  if (state.db) return
  let append;
  process.env.NODE_ENV == 'Test' ? append = '-test' : append = '';

  let uri = 'mongodb://localhost/task-list'+append
  return mongoose.connection.openUri(uri, (err, db, done) => {
  if (err) return done(err)
  state.db = db
})
  done()
};


//CHECK DATABASE STATE
exports.getDB = () => {
 return state.db
}
