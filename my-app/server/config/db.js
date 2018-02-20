const mongoose = require('mongoose');
const DB_EXTERNAL = 'mongodb://localhost:27017/winedb'
const DB_LOCAL = 'mongodb://127.0.0.1:27017/mydb'

mongoose.Promise = global.Promise

//Setup connection to database
mongoose.connect(DB_EXTERNAL, {
    useMongoClient: true
  })
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database  at URL : ${DB_EXTERNAL}`)
  }).catch(() => {
    console.error(`Error Connecting to the Mongodb Database at URL : ${DB_EXTERNAL}`)
  })
