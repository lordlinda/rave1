const express = require('express')
const router =express.Router()
const passport=require('passport')

//import Controllers
const {makePayment,makeSubscription,cancelSubscription,updateSubscription,editPlan} =require('../controllers/paymentsController.js')

//@route     POST /payments/makePayment
//@decription  create  and update onetime payment user
//@access      Private
router.post('/makePayment',passport.authenticate('jwt', { session: false }),makePayment)

//@route        Post /payments/makeSubscription
//@description    create new subscription
//@access        Private
router.post('/makeSubscription',passport.authenticate('jwt', { session: false }),makeSubscription)

//@route        Post /payments/cancelSubscription/:id
//@description    cancel subscription
//@access        Private
router.post('/cancelSubscription/:id',passport.authenticate('jwt', { session: false }),cancelSubscription)

//@route        Post /payments/makeSubscription
//@description    update  subscription
//@access        Private
//Note this has to be post not put or patch because it is a webhook
router.post('https://webhook.site/a74b83a3-0756-40c7-9fa6-2010642be83f',passport.authenticate('jwt', { session: false }),updateSubscription)

//@route        Put /payments/editplan/:id
//@description    update  payment plan
//@access        Private
router.put('/editplan/:id',passport.authenticate('jwt', { session: false }),editPlan)


module.exports =router