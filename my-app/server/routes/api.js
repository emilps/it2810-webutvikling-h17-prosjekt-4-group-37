const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const passport = require('passport');

const connection = (closure) => {
  return MongoClient.connect('mongodb://chrisnyv:Lordoftherings1@35.224.199.3:27017/winedb', (err, db) => {
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
    next()
  } else {
    res.status(200).json({
      authorization: 'Must be logged in'
    })
  }
}

//return wines
router.get('/wines', (req, res) => {
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

// Search for wines
router.post('/wines', (req, res) => {
  // setup variables for sorting
  let sortName = '$natural';
  let sortVariabel = 1;

  // Creates standard filter for regular search
  var liste = [{
    Varetype: "Hvitvin"
  }, {
    Varetype: "Rødvin"
  }]

  // Checks if it needs to sort and adds the Key and value
  if (req.body.sortValue === 1 || req.body.sortValue === -1) {
    sortName = req.body.sortKey;
    sortVariabel = req.body.sortValue;
  }

  // Checks if the user will filter on red or white whine
  if (req.body.wineFilter.length > 0) {
    liste = req.body.wineFilter
  }

  // Creates new filterlist and adds the winefilter
  var newList = [{
    $or: liste
  }]

  // Checks if the user will filter on country, adds this to the list after the winefilter
  if (req.body.countryFilter.length > 0) {
    newList.push({
      $or: req.body.countryFilter
    })
  }

  // adds the search text to a regex that will check the Varenavn
  if (req.body.searchArray.length) {
    if ( !req.body.searchValue == "" ) {
      for (var index = 0; index < req.body.searchArray.length; index++) {
        newList.push({Varenavn: {$regex:  req.body.searchArray[index], $options: 'i'}})
      }
      if (req.body.sortValue === 0) {
        sortName = 'Varenavn';
        sortVariabel = 1;
      }
    }
  }

  // connects to the database and makes a search based on the filters
  connection((db) => {
    db.collection('wines')
      .find({
        $and: newList
      })
      .sort({
        [sortName]: sortVariabel
      })
      .limit(req.body.limit)
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

// returns all countries from database
router.get('/distinctcountries', (req, res) => {
  connection((db) => {
    db.collection('wines')
      .distinct("Land")
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

// Returns wine a user has marked as their favorite
router.post('/getfavoritewines', (req, res) => {
  connection((db) => {
    db.collection('favoritewines')
      .find({
        $and: [{
          "userID": req.body.username
        }, {
          "wineID": {
            $in: [req.body.wine]
          }
        }]
      })
      .limit(10)
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

// removes or adds a wine to favorite list for a user
router.post('/updatefavoritewines', (req, res) => {
  if (!req.body.remove) {
    connection((db) => {
      db.collection('favoritewines')
        .update({
          userID: req.body.username
        }, {
          $push: {
            wineID: req.body.wine
          }
        }, {
          upsert: true
        })
        .then((data) => {
          response.data = data;
          res.json(response);
        })
        .catch((err) => {
          sendError(err, res);
        });
    });
  } else {
    connection((db) => {
      db.collection('favoritewines')
        .update({
          userID: req.body.username
        }, {
          $pull: {
            wineID: req.body.wine
          }
        })
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


// returns wine IDs for a users favorite wines
router.get('/getfavoritewinesids', (req, res) => {
  if (req.user) {
    var listID = [];

    connection((db) => {
      db.collection('favoritewines')
        .find({
          "userID": req.user.name
        })
        .toArray()
        .then((winesIds) => {
          try {
            listID = winesIds[0].wineID;
          } catch (e) {
            listID = [];
          }


          db.collection('wines')
            .find({
              "Varenummer": {
                $in: listID
              }
            })
            .toArray()
            .then((wines) => {
              response.data = wines;
              res.json(response);

            })
            .catch((err) => {
              sendError(err, res);
            })
        })
        .catch((err) => {
          sendError(err, res);
        });
    });
  }
});

router.get('/getwineslog', (req, res) => {
  if (req.user) {
    var listID = [];
    connection((db) => {
      db.collection('log')
        .find({
          "userID": req.user.name
        })
        .toArray()
        .then((winesIds) => {
          try {
            listID = winesIds[0].wineID;
          } catch (e) {
            listID = [];
          }

          // List has to be reversed and duplicates removed in order for it to work
          listID.reverse();
          listID = listID.filter(function(item, pos) {
            return listID.indexOf(item) == pos;
          })

          db.collection('wines')
            .find({
              "Varenummer": {
                $in: listID
              }
            })
            .sort({
              $natural: 1
            })
            .toArray()
            .then((wines) => {
              // makes sure the returned list matches the list of IDs.
              let returnList = []
              for (i = 0; i < listID.length; i++) {
                for (j = 0; j < wines.length; j++) {
                  if (wines[j].Varenummer === listID[i]) {
                    returnList.push(wines[j]);
                  }
                  if (returnList.length === 3) {
                    break;
                  }
                }
                if (returnList.length === 3) {
                  break;
                }
              }
              response.data = returnList;
              res.json(response);
            })
            .catch((err) => {
              sendError(err, res);
            })
        })
        .catch((err) => {
          sendError(err, res);
        });
    });
  }
});


// return reccomended wines based on liked wines
router.post('/getrecommendedwine', (req, res) => {
  const rand = Math.floor(Math.random() * 20)
  connection((db) => {
    db.collection('wines')
      .find({
        $and: [{
          "Varetype": req.body.wineType
        }, {
          "Land": req.body.wineContry
        }]
      })
      .limit(20)
      .toArray()
      .then((wines) => {
        response.data = wines[rand]
        res.json(response)
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


// When a wine item dialog is opened, this adds the specific item to the users log in the database
router.post('/addtolog', (req, res) => {
  connection((db) => {
    // first removes item from database
    db.collection('log')
      .update({
        userID: req.body.username
      }, {
        $pull: {
          wineID: req.body.wine
        }
      })
      .catch((err) => {
        sendError(err, res);
        console.log(err)
      });

    // adds it again for it to be at the right position
    db.collection('log')
      .update({
        userID: req.body.username
      }, {
        $push: {
          wineID: req.body.wine
        }
      }, {
        upsert: true
      })
      .then((data) => {
        response.data = "Log updated";
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
        console.log(err)
      });
  })
});


// returns login status
router.get('/loginstatus', (req, res) => {
  if (req.user) {
    response.data = true;
  } else {
    response.data = false;
  }
  res.json(response)
})

// logs out use
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/register', passport.authenticate('local-signup'),
  function(req, res) {
    if (req.user) {
      res.send(req.user);
      passport.authenticate('local-login')
    }
    res.status(200).send()

  }
);

//Will eventually be renamed login (and all beloning references)
router.post('/login', passport.authenticate('local-login'),
  function(req, res) {
    req.user ? res.send(req.user) : res.send(200, {
      "result": false
    })
  });

router.get('/me', (req, res) => {
  req.user ? res.json(req.user) : res.status(200).send()
});

/*Gets wines from the country that is passed with the req.body.mapFilterValue
if there is one.  */
router.post('/countries', (req, res) => {

  let filterName = null;
  let filterValue = null;

  if (req.body.mapFilterValue.length) {
    filterName = "Land";
    filterValue = req.body.mapFilterValue;
  }

  connection((db) => {
    db.collection('wines')
      .find({
        [filterName]: filterValue
      })
      .limit(req.body.limit)
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
