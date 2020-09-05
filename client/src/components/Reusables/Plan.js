import React from 'react'
import Button from './Button.js'
import axios from 'axios'
import {toast} from 'react-toastify'
import Moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import {numberWithCommas} from '../../helpers/middleware.js'
import Input from './Input.js'
const styles={
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
const Plan=(props)=>{
    const [open, setOpen] = React.useState(false);
    const [formData,setFormData]=React.useState({
      description:props.plan.description,
      targetAmount:props.plan.targetAmount,
    })
      const {description,targetAmount}=formData

const handleChange=text=>e=>{
  setFormData({...formData,[text]:e.target.value})
}
	const cancelSubscription=(plan)=>{
      console.log(plan)
    alert('Are u sure?')
      axios.post(`/payments/cancelSubscription/${plan._id}`,{plan:plan.planId})
           .then(res=>{
            console.log('hello')
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
    let dueDate = ''
    switch(id){
      case 6872:
       dueDate = Moment(date_created).add(1,'days')
      return Moment(dueDate).fromNow()
      case 6873:
     dueDate = Moment(date_created).add(1,'hours')
      return Moment(dueDate).fromNow()
        case 6912:
       dueDate = Moment(date_created).add(1,'weeks')
      return Moment(dueDate).fromNow()
        case 6913:
       dueDate = Moment(date_created).add(1,'months')
      return Moment(dueDate).fromNow()
      case 6929:
       dueDate = Moment(date_created).add(1,'years')
      return Moment(dueDate).fromNow()
        default:
        return ''
    }
    //so we get the date it was created and subtract it from the curent date
    //then we  we add the number of days depending on the 
    //the duration
    //const dueDate = Moment('2020-09-03 14:40').add(7,'days')
    //console.log()
  }
  //getDate()
    //console.log(props)
    const duration=(id)=>{
      //console.log(id)
      switch(id){
        case 6872:
        return '/day';
        case 6873:
        return '/hr';
        case 6912:
        return '/wk'
        case 6913:
        return '/mth'
        case 6929:
        return '/yr'
        default:
        return ''
      }
    }
    const {classes}=props
    //console.log(color)
	return(
		<div className='border shadow-lg mt-5 md:w-full'>

      <div className='px-3 py-2 flex justify-around mb-1'>
           <div className=''>
           <p className='uppercase text-2xl'>{props.plan.description}</p>
             <p className='text-md text-gray-600'>{props.plan.identification}</p>
            {
            props.plan.planId ?
            <div>
            <div className=''>
           <p className=' text-lg mt-1'>Auto:{numberWithCommas(props.plan.installment)}{duration(props.plan.planId)}</p>
            <p className='text-sm'>{getDate(props.plan.planId,props.plan.createdAt)}</p>
           </div>

           </div>

           :null
           }
            <p className='text-md mt-1'>{Moment(props.plan.createdAt).format('LL')}</p>
          
           </div>
           <div className='mt-2 text-lg text-purple-700'>
            <p className='mb-2'>UGX {numberWithCommas(props.plan.amount)}</p>
              <label className='mt-3 text-purple-900'>Target:</label>
            <p className=''>UGX {numberWithCommas(props.plan.targetAmount)}</p>
           
            <Button
        isButton={true}
        onClick={handleClickOpen}
        title='Edit'
        moreStyle='rounded-lg bg-purple-800 text-white px-4 py-1'/>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
        <DialogTitle id="form-dialog-title">Edit plan</DialogTitle>
        <div className='px-5 mb-5'>
          <Input 
           type='text'
           title='Description'
           value={description}
           onChange={handleChange('description')}
            moreStyle='border rounded-lg mt-1 px-4 py-1'
          />
          <Input 
           type='number'
           title='Target Amount'
           value={targetAmount}
            moreStyle='border rounded-lg mt-1 px-4 py-1'
           onChange={handleChange('targetAmount')}
          />
          <div className='flex flex-between'>
          {
            props.plan.planId ?
            <Button 
        isButton={true}
        onClick={cancelSubscription.bind(this,props.plan)}
        title='Cancel Subscription'
        moreStyle='bg-red-500 text-white rounded-lg px-2 py-1 mr-2'/>
            :null
          }
          <Button 
        isButton={true}
        title='Confirm'
        onClick={editPlan.bind(this,props.plan._id)}
        moreStyle='bg-purple-900 text-white rounded-lg mt-4 py-1 px-8 md:mt-6'/>
        </div>
        </div>

      </Dialog>
           </div>
           </div>
</div>
		)
}

export default withStyles(styles)(Plan)