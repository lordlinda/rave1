const mongoose = require('mongoose')

const paymentPlanSchema= mongoose.Schema({
	email:{
		type:String
	},
	amount:{
		type:Number,
	},
	customerId:{
		type:Number
	},
	planId:{
		type:Number
	},
	identification:{
		type:String,
	},
	description:{
		type:String
	},
	createdAt:{
		type:String
	}

})

module.exports = mongoose.model("Plan",paymentPlanSchema)