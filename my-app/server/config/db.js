const mongoose = require('mongoose');
const DB_EXTERNAL = 'mongodb://winedb:Lordoftherings1@ds117758.mlab.com:17758/mean-demo'
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
