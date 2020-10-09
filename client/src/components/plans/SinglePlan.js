import React, { useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'



import { numberWithCommas } from '../../helpers/middleware.js'
import Button from '../Reusables/Button.js'
import ProgressBar from '../Reusables/ProgressBar.js'
import BackArrow from '../Reusables/BackArrow.js'
import * as actions from '../../redux/actions/index.js'

const SinglePlan = (props) => {
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen(!open);
  }

  const id = props.match.params.id
  useEffect(() => {
    props.getPlan(id)
  }, [id])

  const cancelSubscription = (id, plan) => {
    console.log(id, plan)
    props.cancelSubscription(id, plan)
    //console.log('clicked')
  }
  //give the first subscriptions
  //we give a distance from the top one
  return (
    /*didnt use a w-1/2 because of no space between the boxes*/
    <div className='bg-customPurple'>
      {props.plan ?
        <>
          <div className='px-5'>
            <BackArrow href='/plans' moreStyle='pt-2 text-white' />

            <p className='text-2xl text-white pt-8 px-6'>{props.plan.name ? props.plan.name : "Checking account"}</p>
            {props.plan.targetAmount ? <ProgressBar amount={props.plan.amount} targetAmount={props.plan.targetAmount} /> : null}
            <div className='flex px-6 mt-4 items-baseline'>
              <Button
                isButton={true}
                onClick={handleToggle}
                title='TopUp'
                moreStyle='text-customPurple bg-white rounded-md py-1 px-2'
              />
              <Dialog
                open={open}
                onClose={handleToggle}
                className='plan__modal'>
                <DialogTitle id="form-dialog-title">
                  {/*on small screens since we dont have space the cancel button
        we use baseline to ensure the text is on the same line*/}
                  <p className='text-md'>Choose Payment Method</p>
                </DialogTitle>
                <div className='px-3 py-2'>
                  <Button
                    href={'/rave/' + props.plan._id}
                    title='One time'
                  />
                  <Button
                    href={'/createSubscription/' + props.plan._id}
                    title='Automate Savings'
                  />
                </div>
              </Dialog>
              <Button
                href={'/editplan/' + props.plan._id}
                title='Edit'
                moreStyle='bg-customPurple text-white rounded-md py-1 px-2 border ml-2'
              />
            </div>
          </div>
          <div className='rounded-t-lg bg-white px-5 py-2 mt-2'>
            <p className='text-lg mt-2'>Amount saved:{props.plan.currency}{numberWithCommas(props.plan.amount)}</p>
            {props.plan.targetAmount ? <p className='text-lg py-1'>Target Amount:{props.plan.currency}{numberWithCommas(props.plan.targetAmount)}</p> : null}

            {
              props.plan.description ?
                <>
                  <p className='text-lg mt-2'>Description</p>
                  <p>{props.plan.description}</p>
                </> : null
            }

            {
              props.plan.planId ?
                <Button
                  title='Cancel subscription'
                  isButton={true}
                  onClick={() => cancelSubscription(props.plan._id, props.plan.planId)}
                  moreStyle='text-md text-red-700 mt-20'
                /> : null
            }
          </div>
        </>
        : null}

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    plan: state.data.plan
  }
}

export default connect(mapStateToProps, actions)(SinglePlan)