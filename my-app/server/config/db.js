const mongoose = require('mongoose');
const DB_EXTERNAL = 'mongodb://emilps:testpass@129.241.97.47:27017/mydb'
const DB_LOCAL = 'mongodb://127.0.0.1:27017/mydb'

mongoose.Promise = global.Promise

mongoose.connect(DB_EXTERNAL, {
    useMongoClient: true
  })
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database  at URL : ${DB_EXTERNAL}`)
  }).catch(() => {
    console.error(`Error Connecting to the Mongodb Database at URL : ${DB_EXTERNAL}`)
  })
