import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/index.js'

import Button from  '../Reusables/Button.js'
import Plan from '../Reusables/Plan.js'
const Subscriptions=(props)=>{

  
  const [open, setOpen] = useState(false)
  const [subscriptions,setSubscriptions]=useState([])

  const handleClick = () => {
    setOpen(!open);
  }
  useEffect(()=>{
   props.getAllPlans()
  },[props.plans.length])

 console.log(props)
	return(
		<div className='mt-8 '>
     {/*the plans title*/}
	      <div className='flex items-baseline justify-between px-5'>
        <p className='text-xl text-titleGray'>Plans</p>
        <Button
        href='/plans'
        title='See All'
        moreStyle='text-lg text-titleLink'
         />
        </div>
      {/*mapout our plans*/}
      {
        /*we want to display only two plans on dashboard*/
       props.plans ?
       props.plans.slice(0,2).map(plan=>{
       return <Plan plan={plan} key={plan._id}/>
       })
       :<p>No plans yet</p>
      }
		</div>
		)

}

const mapStateToProps=(state)=>{
 return {
  plans:state.data.plans
 }
}


export default connect(mapStateToProps,actions)(Subscriptions)