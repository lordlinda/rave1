const { check } = require('express-validator');
const  ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const passport =require('passport')
const User=require('./models/User.js')

module.exports = {
	validateRegister:[
	check('username')
	  .isLength({min:3}).withMessage('username must be greater than 3 chars'),
	  check('email')
	  .isEmail().withMessage('please enter a valid email'),
	  check('password')
	  .isLength({min:8}).withMessage('password must be greater than 8 chars')
	],
passportAuth:passport.use(new JwtStrategy(
{
	jwtFromRequest : ExtractJwt.fromHeader('authorization'),
	secretOrKey :process.env.JWT_SECRET
}, function(jwt_payload, done) {
	//jwt_payload  contains the decode token where we stored our id
	//so we pick the id from the decode token and find the user
   User.findOne({_id: jwt_payload.sub},function(err,user){
   	//if there is an error we return the error without the user
   	if(err){
   		return done(err,false)
   	}
   	 if (user) {
   	 	// if we  return a  user which is stored as req.user
            return done(null, user)
        } else {
            return done(null, false)
        }
   })
})
),

}