import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index.js'

import Button from '../Reusables/Button.js'
import Plan from './Plan.js'

const Plans = (props) => {

  useEffect(() => {
    props.getAllPlans()
  }, [props.plans.length])


  return (
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
        props.loading ?
          <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-400 h-12 w-12"></div>
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div> : null

      }
      {
        /*we want to display only two plans on dashboard*/
        props.plans ?
          props.plans.slice(0, 2).map(plan => {
            return <Plan plan={plan} key={plan._id} />
          })
          : <p>No plans yet</p>
      }
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    plans: state.data.plans,
    loading: state.data.loading

  }
}


export default connect(mapStateToProps, actions)(Plans)