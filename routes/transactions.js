const express = require('express')
const router =express.Router()
const passport=require('passport')

const {getTransactions,getTransaction} =require('../controllers/transactionsController.js')

//@route     POST /transactions
//@decription  get transactions based on the parametes
//@access      Private
router.post('/',passport.authenticate('jwt', { session: false }),getTransactions)

//@route     GET /transactions
//@decription  get transaction
//@access      Private
router.get('/:id',passport.authenticate('jwt', { session: false }),getTransaction)
module.exports = router