const mongoose = require('mongoose')

const paymentPlanSchema= mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
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
	},
	name:{
		type:String,
		unique:true
	},
	status:{
		type:String,
		default:'Inactive'
	},
	currency:{
		type:String
	}

})

module.exports = mongoose.model("Plan",paymentPlanSchema)