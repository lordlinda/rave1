const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema= mongoose.Schema({
	email:{
		type:String,
		unique:true
	},
	password:{
		type:String,
	},
	username:{
		type:String
	},
	paymentPlan:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Plan'
	}]
})
//for this case using an arrow function gives an error
//terming this as undefined
userSchema.pre('save',function(next){
	 //2. we generate a salt  and hash the password
	 //we use this.local.password because the password is now nested
	 //in the local object
	   bcrypt.hash(this.password, 10, (err, hash)=> {
	   	if(err){
	   		return console.error(err)
	   	}
		//we set the password to the hash
		this.password = hash
		//the next function is inside the bcrypt function
		 next();

	   //3. we save the new User to the database
      })//end of bcrypt function

})

module.exports = mongoose.model("User",userSchema)