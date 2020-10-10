import React, { useEffect } from 'react'
import { connect } from 'react-redux'



import Goal from './SingleGoal.js'
import PlusButton from '../Reusables/Plus.js'
import * as actions from '../../redux/actions/index.js'
import Navbar from '../Navbar/Navbar'
const AllPlans = (props) => {
  useEffect(() => {
    props.getAllPlans()
  }, [props.plans.length])



  return (
    <div>
      <div className='mx-5'>
        {/*the plans title*/}
        <div className='mt-6 flex justify-between'>
          <div className='text-xl text-titleLink'>
            <Navbar />
          Your Plans</div>
          <PlusButton href='/createPlan' />
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
    </div >
  )

}

const mapStateToProps = (state) => {
  return {
    plans: state.data.plans
  }
}


export default connect(mapStateToProps, actions)(AllPlans)