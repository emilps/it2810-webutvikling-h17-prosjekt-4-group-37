const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const passport = require('passport');

const connection = (closure) => {
    return MongoClient.connect('mongodb://alvise:mypass@129.241.97.47:27017/mydb', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

//mongoose.connect('mongodb://alvise:mypass@129.241.97.47:27017/mydb');
const User = require('../model/user');

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

//Gives access only to users logged in
global.loggedIn = (req, res, next) => {
    if (req.user) {
        console.log('User is logged in')
        next()
    } else {
        console.log('Protected route access attempted by a not logged in user')
        res.status(401).json({authorization: 'Must be logged in'})
    }
}

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .limit( 100 )
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

//get wines
router.get('/wines', loggedIn, (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find()
            .limit( 95 )
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

//Handles input from client. Insert register input after password is secured with salt and hash.
router.post('/register', (req, res) => {
    user = new User({
      name: req.body.name
    })
    console.log(user)
    user.password = user.generateHash(req.body.password)
    user.save().then((user) => {
      //console.log(`User ID: ${user._id}`)
      User.findById(user.id).then((user) => {
        console.log(user)
      })
    }).catch((err) => {
      console.error(err)
    })
  })



//Will eventually be renamed login (and all beloning references)
router.post('/getUser',
  passport.authenticate( 'local-login', {} ),
  function( req, res ) {
      console.log('hello!')
      console.log(req.user )
      //res.send( 'Logged in!' )
})



module.exports = router;
