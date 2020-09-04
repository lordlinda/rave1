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
	},
	targetAmount:{
		type:Number
	},
	installment:{
		type:Number
	},
	duration:{
		type:Number
	}

})

module.exports = mongoose.model("Plan",paymentPlanSchema)