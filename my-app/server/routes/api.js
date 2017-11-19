const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const passport = require('passport');

const connection = (closure) => {
    return MongoClient.connect('mongodb://emilps:testpass@129.241.97.47:27017/mydb', (err, db) => {
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
        res.status(200).json({authorization: 'Must be logged in'})
    }
}

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
  console.log("hello");
    connection((db) => {
        db.collection('wines')
            .find()
            .limit(100)
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

router.post('/wines', (req, res) => {
    //console.log(req.body.searchValue);

    let sortName = '$natural';
    let sortVariabel = 1;

    let filterName = null;
    let filterVariable = null;

    var liste = [ { Varetype: "Hvitvin" },{ Varetype: "Rødvin" } ]
    console.log(liste)
    if (req.body.priceSort === 1 || req.body.priceSort === -1 ){
      sortName = 'Pris';
      sortVariabel = req.body.priceSort;
    } else if (req.body.letterSort === 1 || req.body.letterSort === -1) {
      sortName = 'Varenavn';
      sortVariabel = req.body.letterSort;
    }

    if (req.body.wineFilter.length > 0) {
      filterName = req.body.wineFilter;
      filterVariable = req.body.wineFilterValue;
      liste = req.body.wineFilter
    }

    var newList = [{ $or: liste }]
    if (req.body.countryFilter.length > 0) {
      newList.push({ $or: req.body.countryFilter})
    }

    if(req.body.searchValue.length){
      console.log(req.body.searchValue)
      let search = { $search: ('\"' + req.body.searchValue + '\"') }
      console.log(search);
      newList.unshift({ $text: search })
      if (req.body.letterSort === 0 && req.body.priceSort === 0) {
        sortName = 'Varenavn';
        sortVariabel = 1;
      }
    }

    console.log(newList)



    connection((db) => {
        db.collection('wines')
            .find({$and:newList})
            .sort({ [sortName]: sortVariabel })
            .limit( req.body.limit )
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

router.post('/getfavoritewines', (req, res) => {
    console.log("------TEST------", req.body.username);
    console.log("------TEST------", req.body.wine);
    connection((db) => {
        db.collection('favoritewines')
            .find({$and: [{"userID": req.body.username}, {"wineID": {$in: [req.body.wine]}}]})
            .limit( 10 )
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

router.post('/updatefavoritewines', (req, res) => {
    console.log("------TEST------", req.body.username);
    console.log("------TEST------", req.body.remove);
    if (!req.body.remove) {
      connection((db) => {
          db.collection('favoritewines')
              .update(
                {userID: req.body.username},
                {$push: {wineID: req.body.wine}},
                {upsert: true})
              .then((data) => {
                  response.data = data;
                  res.json(response);
              })
              .catch((err) => {
                  sendError(err, res);
              });
      });
    }else{
      connection((db) => {
          db.collection('favoritewines')
              .update(
                {userID: req.body.username},
                {$pull: {wineID: req.body.wine}})
              .then((data) => {
                  response.data = data;
                  res.json(response);
              })
              .catch((err) => {
                  sendError(err, res);
              });
      });
    }

});

router.get('/loginstatus', (req,res) =>{
    if (req.user) {
    response.data = true;
    } else {
        response.data = false;
    }

    res.json(response)
})

router.get('/logout', function(req, res){
  console.log("wowow: ");
  req.logout();
  res.redirect('/');
});

//Handles input from client. Insert register input after password is secured with salt and hash.
/*router.post('/register', (req, res) => {
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
  })*/

router.post('/register', passport.authenticate('local-signup'),
  function(req,res) {
    req.user ? res.send(req.user) : res.status(200).send()
  }
  );

//Will eventually be renamed login (and all beloning references)
router.post('/getUser', passport.authenticate('local-login'),
  function(req, res) {
    console.log("Message " );
    console.log('User: ' + req.user)
    req.user ? res.send(req.user) : res.send(200,{"result": false})
  });

router.get('/me', (req, res) => {
    console.log('Getting logged in user')
    req.user ? res.json(req.user) : res.status(200).send()
});
router.post('/countries', (req, res) => {
    let filterName = null;
    let filterValue = null;

    if (req.body.mapFilterValue.length) {
      filterName = "Land";
      filterValue = req.body.mapFilterValue;
    }


    connection((db) => {
        db.collection('wines')
            .find({[filterName]:filterValue})
            .limit( 25 )
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


module.exports = router;
