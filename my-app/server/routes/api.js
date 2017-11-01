const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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

router.post('/wines', (req, res) => {
    console.log(req.body.wineFilter);

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

    console.log(liste)

    //var liste = [ { Varetype: "Hvitvin" } ]


    connection((db) => {
        db.collection('wines')
            .find({ $or: liste })
            .sort({ [sortName]: sortVariabel })
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

router.get('/wines', (req, res) => {
    connection((db) => {
        db.collection('wines')
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


module.exports = router;
