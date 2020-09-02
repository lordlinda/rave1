const express=require('express')
const unirest = require('unirest');
const cors =require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
const Ravepay = require("flutterwave-node");
 const request = require('request');
 const moment=require('moment')
const rave = new Ravepay(process.env.PUBLIC, process.env.SECRET, false);
const morgan=require('morgan')
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

 //console.log(moment('2020-08-31T09:26:42.000Z').format("YYYY-MM-DD HH:mm"))


app.listen(5000,()=>console.log('server is listening'))