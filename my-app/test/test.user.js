var should = require("should");
var mongoose = require('mongoose');
var User = require("./../server/model/user");
var db;

describe('User', function() {

  before(function(done) {
    mongoose.Promise = global.Promise;
    db = mongoose.connect('mongodb://emilps:testpass@129.241.97.47:27017/mydb', {useMongoClient: true});
    done();
  });

  after(function(done) {
    mongoose.connection.close()
    done();
  });

  beforeEach(function(done) {
    var user = new User({
      name: '1234567',
      password: 'testing123'
    });

    user.save(function(error) {
      if (error) console.log('error' + error.message);
      else console.log('no error');
      done();
    });
  });

  it('find a user by username', function(done) {
    User.findOne({
      name: '1234567'
    }, function(err, user) {
      user.name.should.eql('1234567');
      console.log("   name: ", user.name)
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

});
