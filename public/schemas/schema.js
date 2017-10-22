const minlength = [1, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

//SCHEMA
module.exports = {
    _id: {type: String},
    task: { type: String, minlength: minlength },
    isDone: { type: Boolean }
  }
