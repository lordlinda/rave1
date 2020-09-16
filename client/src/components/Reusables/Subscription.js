import React from 'react'
import Button from './Button.js'
import axios from 'axios'
import {toast} from 'react-toastify'
import Moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import {numberWithCommas} from '../../helpers/middleware.js'
import { extendMoment } from 'moment-range'
import Input from './Input.js'

const moment = extendMoment(Moment);
const styles={
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
const Subscription=(props)=>{
    const [open, setOpen] = React.useState(false);
    const [formData,setFormData]=React.useState({
      description:'',
      targetAmount:'',
    })
      const {description,targetAmount}=formData

const handleChange=text=>e=>{
  setFormData({...formData,[text]:e.target.value})
}
	const cancelSubscription=(plan)=>{
      //console.log(plan)
    alert('Are u sure?')
      axios.post(`/payments/cancelSubscription/${plan._id}`,{plan:plan.planId})
           .then(res=>{
            //console.log('hello')
            toast.success('Unsubscribed from plan')
           })
    }

    const editPlan=(id)=>{
      const variables ={
        targetAmount:targetAmount,
        description:description
      }
      axios.put(`/payments/editplan/${id}`,variables)
           .then(res=>{
            console.log('hello')
            //toast.sucess('Unsubscribed from plan')
           })
           setOpen(false)
    }
    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const getDate=(id,date_created)=>{
    let range =''
    let date = ''
    switch(id){
      case 6873:
    range = moment.range(date_created,Moment(date_created).add(5,'weeks'))
    const hours = Array.from(range.by('hour'))
    date = hours.filter(hour=>hour.format('YYYY-MM-DD HH:mm') > Moment().format('YYYY-MM-DD HH:mm'))[0]
    return date.format('HH:mm') + 'due';
     case 6872:
    range = moment.range(date_created,Moment(date_created).add(5,'weeks'))
    const days = Array.from(range.by('day'))
    date = days.filter(day=>day.format('YYYY-MM-DD HH:mm') > Moment().format('YYYY-MM-DD HH:mm'))[0]
    return date.format('MM-DD') + 'due';
    case 6912:
     range = moment.range(date_created,Moment(date_created).add(5,'months'))
    const weeks = Array.from(range.by('week'))
    date = weeks.filter(week=>week.format('YYYY-MM-DD HH:mm') > Moment().format('YYYY-MM-DD HH:mm'))[0]
    return date.format('MM-DD') + 'due';
    case 6913:
    range = moment.range(date_created,Moment(date_created).add(5,'years'))
    const months = Array.from(range.by('month'))
    date = months.filter(month=>month.format('YYYY-MM-DD HH:mm') > Moment().format('YYYY-MM-DD HH:mm'))[0]
    return date.format('MM-DD') + 'due';
    case 6929:
    range = moment.range(date_created,Moment(date_created).add(5,'weeks'))
    const years = Array.from(range.by('year'))
     date = years.filter(year=>year.format('YYYY-MM-DD HH:mm') > Moment().format('YYYY-MM-DD HH:mm'))[0]
    return date.format('YYYY-MM-DD') + 'due'
  }
  }
      const duration=(id)=>{
      //console.log(id)
      switch(id){
        case 6872:
        return '/dy';
        case 6873:
        return '/hr';
        case 6912:
        return '/wk';
        case 6913:
        return '/mth';
        case 6929:
        return '/yr';
        default:
        return ''
      }
    }
    const {classes}=props
    //we give the first subscriptions
    //we give a distance from the top one 
    //give it in line 
	return(
		<div className='px-2 mt-4'>
    {/*we want the interval to be  beside the other text*/}
    <div className='flex justify-between'>
    <div>
  {/*we begin with description and the installment amount*/}
     <p className='text-sm text-graydark'>{props.plan.description ? props.plan.description :'Checking account'}</p>
     {/*we display the installment amount and the due date next to each other*/}
          <div className='md:flex text-gray-800 text-xl flex-wrap'>
          <p className='font-semibold -mt-1'>UGX{numberWithCommas(props.plan.installment)}<span className='text-md'>{duration(props.plan.planId)}</span></p>
        {/*due date that it is some distance from the installment amount*/}
          <p className='md:ml-1 block md:hidden text-sm -mt-2 text-gray-700'>{getDate(props.plan.planId,props.plan.createdAt)}</p>
          </div>
      </div>
    {/*and then the target that only shows on mediuma and large screens*/}
      <div className='hidden md:block'>
      <p className='text-sm text-graydark'>Target</p>
      <p className='text-xl text-gray-800 font-semibold -mt-1'>{props.plan.targetAmount ? numberWithCommas(props.plan.targetAmount) :0}</p>
      </div>
    {/*followed by the next biiling date*/}
      <div className='hidden md:block'>
      <p className='text-sm text-graydark'>Due</p>
      <p className='md:ml-1 text-xl text-gray-800 font-semibold -mt-1'>{getDate(props.plan.planId,props.plan.createdAt)}</p>
      </div>
    {/* followed bu our action buttons
    we add our edit button in the flex bottom to go to the right of the conatiner
  */}
         <div className='flex justify-between'>
            <Button
        isButton={true}
        onClick={handleClickOpen}
        title='Edit'
        moreStyle='rounded-lg px-2 bg-purple-500 text-white'/>
        <Button
        isButton={true}
        onClick={cancelSubscription.bind(this,props.plan)}
        title='Cancel'
        moreStyle='bg-teal-400 hidden md:block rounded-lg px-2 ml-1 text-white'/>
        </div>
      {/*this is the modal that pops up the classes.root is what allows the modal and its content to be perfecly centered*/}
          <Dialog 
          open={open} 
          onClose={handleClose} aria-labelledby="form-dialog-title" 
          className={classes.root}>
        <DialogTitle id="form-dialog-title">
        {/*on small screens since we dont have space the cancel button
        we use baseline to ensure the text is on the same line*/}
        <div className='flex justify-between items-baseline'>
          <p>Edit plan</p>
           <Button
        isButton={true}
        onClick={cancelSubscription.bind(this,props.plan)}
        title='cancel subscription'
        moreStyle='bg-purple-400 block md:hidden text-xs px-1 rounded-md'/>
          </div>
        </DialogTitle>
        <div className='px-3 py-2'>
          <Input 
           type='text'
           title='Description'
           value={description}
           onChange={handleChange('description')}
            moreStyle='border-2 w-full px-4 py-1 rounded-md appearance-none'
          />
          <Input 
           type='number'
           title='Target Amount'
           value={targetAmount}
            moreStyle='border-2 w-full px-4 py-1 rounded-md appearance-none'
           onChange={handleChange('targetAmount')}
          />
          <Button
        isButton={true}
        onClick={editPlan.bind(this,props.plan._id)}
        title='Confirm'
        moreStyle='bg-purple-500 rounded-lg px-2 mb-2 w-full py-1 text-white'/>
          </div>
           

      </Dialog>
       </div>
</div>
		)
}

export default withStyles(styles)(Subscription)