var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// Define a schema.
var userSchema = new Schema({
  name: String,
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = User;
