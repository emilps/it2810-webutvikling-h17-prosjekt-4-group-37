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

router.get('/wines', (req, res) => {
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

router.get('/winesRed', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find({"Varetype":"Rødvin"})
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

router.get('/winesWhite', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find({"Varetype":"Hvitvin"})
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

router.get('/winesASC', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find()
            .sort( { "Varenavn": 1} )
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

router.get('/winesDESC', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find()
            .sort( { "Varenavn": -1} )
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

router.get('/winesPriceASC', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find()
            .sort( { "Pris": 1} )
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

router.get('/winesPriceDESC', (req, res) => {
    connection((db) => {
        db.collection('wines')
            .find()
            .sort( { "Pris": -1} )
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

module.exports = router;
