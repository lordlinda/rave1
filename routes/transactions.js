const express = require('express')
const router =express.Router()
const passport=require('passport')

const {getTransactions} =require('../controllers/transactionsController.js')

//@route     POST /transactions
//@decription  get transactions based on the parametes
//@access      Private
router.post('/',passport.authenticate('jwt', { session: false }),getTransactions)

module.exports = router