var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Define a schema for user.
var userSchema = new mongoose.Schema({
  name:{
      type: String,
      unique: true,
      required: true
  },
  hash: String,
  salt: String
});
// function that encrypts password. Both salting and hasing.
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
//function that checks input password when logging in.
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  console.log(this.hash === hash);
  return this.hash === hash;
};


userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// Create a model.
var User = mongoose.model('User', userSchema);
module.exports = User;
