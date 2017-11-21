var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// app/models/user.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

let Schema = mongoose.Schema

// define the schema for our user model
let User = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// generating a hash
User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

// generating a hash
User.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


// Create a model.
let user = mongoose.model('User', User);
module.exports = user;
