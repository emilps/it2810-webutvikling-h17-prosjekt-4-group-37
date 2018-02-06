const express = require('express');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser')
const session = require('express-session')
const path = require('path');
const http = require('http');
const passport = require('passport');


//CONSTANTS
//const SECRET = process.env.HUB_SECRET


// SETUP
const app = express();

var sess = {
    secret: "thisissocool123",
    cookie: {}
}


app.use(session(sess))


// API file for interacting with MongoDB
require('./server/config/db')
const api = require('./server/routes/api');
//require('./server/config/passport');

// Parsers
app.use(cookieparser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


// API location
require('./server/config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session())
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '8084';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
