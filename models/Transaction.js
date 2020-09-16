const mongoose = require('mongoose')

const transactionSchema= mongoose.Schema({
	transactionId:{
		type:String,
	},
	amount:{
		type:Number
	},
	paymentMethod:{
		type:String
	},
	currency :{
		type:String
	},
	date:{
		type:String
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	paymentPlan:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Plan'
	}

})

module.exports = mongoose.model("Transaction",transactionSchema)