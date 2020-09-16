import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Collapse from '@material-ui/core/Collapse';


import Button from './Reusables/Button.js'
import CreateSubscription from './CreateSubscription.js'
import * as actions from '../redux/actions/index.js'
import Subscription from './Reusables/Subscription.js'
import Avatar from './Reusables/Avatar.js'
import Navbar from './Navbar/Navbar.js'

const Subscriptions=(props)=>{

  useEffect(()=>{
  props.loadUser()
  getSubscriptions()
  },[props.plans.length])
  const [open, setOpen] = useState(false)
  const [subscriptions,setSubscriptions]=useState([])

  const handleClick = () => {
    setOpen(!open);
  };

const getSubscriptions=()=>{
  //this function allows us to filter between subscriptions and one time payments
  const sortedplans = props.plans.filter(plan=>plan.identification === 'recurring bill')

  setSubscriptions(sortedplans)
}
	return(
		<div className='px-4 md:mt-3'>
	      	{/*this is displays the title of the page*/}
          <div className='md:flex md:justify-between'>
		      <p className='sd:text-3xl md:py-4 font-bold sd:ml-4 text-xl ml-3 mt-4'>
          <Navbar/>
          Subscriptions</p>
          <Avatar/>
        </div>
		     {/*after the title we display the subcription payment part
         we are going to place in acollapsible such that it is only seen when it is needed
         we style the button such that it is on the right so we give it a position of absolute*/}
         <div>
           <Button 
           isButton={true}
           onClick={handleClick}
           title='New'
           moreStyle='bg-teal-500 rounded-lg h-full px-2 mb-2 text-teal-100'
           />
           <Collapse in={open} timeout="auto" unmountOnExit>
             <CreateSubscription />
           </Collapse>
          </div>
          {/*subscriptions are listed down here we map them out to a subscription component*/}
          <div className=''>
          {
            subscriptions.length > 0 ?
             subscriptions.map(subscription=> <Subscription key={subscription._id} plan={subscription}/>)
            :<p>No subscriptions yet</p>
          }
          </div>
              
              

		</div>
		)

}

const mapStateToProps=(state)=>{
	return {
         plans:state.data.plans
	}
}

export default connect(mapStateToProps,actions)(Subscriptions)