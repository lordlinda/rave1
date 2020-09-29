 const moment=require('moment')
const Transaction =require('../models/Transaction.js')
module.exports ={
	getTransactions:(req,res)=>{
		console.log(req.body)
		const {limit,to}=req.body
        //in the front end we want to be able to show a few  transactions on the home page
        //but all of them in the transactions page()
        //note limit should be numeric and not a string
         Limit = limit ? limit : 0

         let findArgs = {}
         if(req.body){
         for(let key in req.body){
                         findArgs['date']={
                                 $gte:req.body.date ? (moment(req.body.date).subtract(1,'days')).format('YYYY-MM-DD HH:mm') : '1970-01-01',
                                 $lt:req.body.date ? (moment(req.body.date).add(1,'days')).format('YYYY-MM-DD HH:mm') :'4040-10-11'
                         }
         		//we want findArgs to look like this {date:{$gte:'2020-09-09',$lt:'2020-09-10'}}
         		if(req.body.paymentMethod){
                         findArgs['paymentMethod']=req.body['paymentMethod']
                        }
                        if(req.body.currency){
                             findArgs['currency']=req.body['currency']
                        }
         		//i did this because limit interferes with the search parameters
        } 
 }
 console.log(findArgs)
		Transaction.find({user:req.user._id,...findArgs})
		.limit(Limit)
		//we want to have the latest payments on top so we sort the date in descending order starting from the beginning
		.sort({date:-1})
		.then(transactions=>{
			res.status(200).json({
				transactions:transactions
			})
		}).catch(err=>{
			res.status(500).json({
				msg:err.message
			})
		})


	},
    getTransaction:(req,res)=>{
        Transaction.findOne({_id:req.params.id})
        .populate('paymentPlan','description')
        .then(transaction=>{
              res.status(200).json({
                transaction:transaction
              })
        }).catch(err=>{
           res.status(500).json({
            msg:err.message
           })
        })
    },
    createTransaction:(response,plan,user,res)=>{
    const newTransaction = new Transaction({
                    transactionId:response.tx.id,
                    amount:response.tx.amount,
                    paymentMethod:response.tx.paymentType,
                    currency:response.tx.currency,
                    date:moment(Date.now()).format("YYYY-MM-DD HH:mm"),
                    paymentPlan:plan._id,
                    user:user
              })
              newTransaction.save()
              .then(transaction=>{
                res.status(200).json({
                   msg:'Payment plan updated',
                   message:'Transaction history registered'
              })
              })
  },
}