import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'



import Button from '../Reusables/Button.js'
import Goal from './SingleGoal.js'
import PlusButton from '../Reusables/Plus.js'
import * as actions from '../../redux/actions/index.js'
import BottomNavigation from '../Reusables/BottomNavigation.js'

const AllPlans = (props) => {
  useEffect(() => {
    props.getAllPlans()
  }, [props.plans.length])

  const [open, setOpen] = useState(false)
  const [subscriptions, setSubscriptions] = useState([])

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='transition duration-500 ease-in-out'>
      <div className='mx-5'>
        {/*the plans title*/}
        <div className='mt-8 flex justify-between'>
          <p className='text-xl text-titleLink'> Your Plans</p>
          <PlusButton href='/createPlan' moreStyle='bg-titleLink rounded-full h-6 w-6 text-white' />
        </div>
        {/*mapout our plans*/}
        <div className='flex justify-start flex-wrap items-baseline'>
          {
            props.plans.map(plan => {
              return <Goal plan={plan} key={plan._id} />
            })
          }
        </div>
      </div>
      <BottomNavigation />
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    plans: state.data.plans
  }
}


export default connect(mapStateToProps, actions)(AllPlans)