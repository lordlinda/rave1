import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'
import Dashboard from './Dashboard.js'

const Home=(props)=>{
	const [total, setTotal] = useState(0)
    const [subscriptions,setSubscriptions]=useState([])
   useEffect(()=>{
    props.loadUser()
    getTotal()
	props.getTransactions({limit:5})
	getSubscriptions()

},[props.plans.length,props.transactions.length,total])


const getSubscriptions=()=>{
	//this function allows us to filter between subscriptions and one time payments
	const sortedplans = props.plans.filter(plan=>plan.identification === 'recurring bill')

	setSubscriptions(sortedplans)
}


 const getTotal = () => {
 	//console.log(props.plans)
        if (props.plans.length > 0) {
            let total = 0
            props.plans.map(plan => {
                total += plan.amount
                setTotal(total)

            })
        }
    }

return (  
		<div>
		{/*this is the main screen where our data keeps changing depending on route*/}
		<div>
		<div className='bg-gray-500 rounded-full'></div>
          <Dashboard 
          total={total}
          subscriptions={subscriptions}
          />
		</div>
		</div>

		)

}

const mapStateToProps=(state)=>{
 return {
 	plans:state.data.plans,
 	transactions:state.data.transactions
 }
}
export default connect(mapStateToProps,actions)(Home)

