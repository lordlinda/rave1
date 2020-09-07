const express=require('express')
const unirest = require('unirest');
const cors =require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
 const moment=require('moment')
const morgan=require('morgan')
const path=require('path')
//connect to mongodb
const connectDB =require('./db.js')

const app =express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

//For routes
app.use('/users',require('./routes/users.js'))
app.use('/payments',require('./routes/payments.js'))

 //console.log(moment('2020-09-05T16:15:34.000Z').format("YYYY-MM-DD HH:mm"))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

const port =process.env.PORT || 5000
app.listen(port,()=>console.log('server is listening'))