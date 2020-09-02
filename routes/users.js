const express = require('express')
const router =express.Router()
const passport=require('passport')
//import Controllers
const {signup,getUser,signin} =require('../controllers/userController.js')

const {validateRegister,passportAuth}=require('../middleware.js')
//@route     POST /users/signup
//@decription  create new user
//@access      Public
router.post('/signup',validateRegister,signup)

//@route        GET /users/user
//@description  get user
//@acess        Private
router.get('/user',passport.authenticate('jwt', { session: false }),getUser)  

router.post('/signin',signin)


module.exports =router