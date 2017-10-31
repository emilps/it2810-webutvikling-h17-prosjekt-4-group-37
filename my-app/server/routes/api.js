const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
var User = require('../model/User');



//mongoose.connect('mongodb://alvise:mypass@129.241.97.47:27017/mydb');
//require('./../model/user');


// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://alvise:mypass@129.241.97.47:27017/mydb', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/wines', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find()
            .limit( 5 )
            .toArray()
            .then((wines) => {
                response.data = wines;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
// Query for username(username is unice) if a match runs validPassowrd to check if user password meets the input password.
/*router.post('/getUser', (req, res) => {
  var username = req.body.name;
  console.log(username);
  connection((db) => {
    db.collection('users')
        .findOne({ name: username}, function (err, user){
          var userLogin = new User();
          userLogin.name = user.name;
          userLogin.hash = user.hash;
          userLogin.salt = user.salt;
          console.log(user);
          if(userLogin && userLogin.validPassword(req.body.password)){
            response.date = "true";
            res.json(response);
          }
         if (err) { return done(err); }
        })
  })
})*/
//Handles input from client. Insert register input after password is secured with salt and hash.
router.post('/register',(req, res) => {
  var newUser = new User();
  newUser.name = req.body.name;
  newUser.setPassword(req.body.password);
  connection((db) => {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
    db.collection('users')
      .insertOne(newUser, function(err, res){
        if (err) throw err;
        console.log("Doc inserted")
      });
  });
});

//Will eventually be renamed login (and all beloning references)
router.post('/getUser', (req, res) => {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

});

module.exports = router;
