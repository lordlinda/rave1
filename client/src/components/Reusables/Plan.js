import React from 'react'
import Moment from 'moment'
import {numberWithCommas} from '../../helpers/middleware.js'
import { extendMoment } from 'moment-range'
import {Link} from 'react-router-dom'

import Button from './Button.js'
const moment = extendMoment(Moment);
const Plan=(props)=>{
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
    return date.format('LL') + 'due';
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
        return 'daily';
        case 6873:
        return 'hourly';
        case 6912:
        return 'weekly'
        case 6913:
        return 'monthly'
        case 6929:
        return 'yearly'
        default:
        return ''
      }
    }
    //we give the first subscriptions
    //we give a distance from the top one
	return(
    <Link to ={'/plan/'+props.plan._id}>
		<div className='shadow-planShadow mt-3 px-4 py-2 rounded-lg'>
    <div className='flex justify-between'>
    <div>
     <p className='text-titleDark font-semibold text-xl'>{props.plan.name ? props.plan.name :'Checking account'}</p>
     {/*we display the installment amount and the due date next to each other*/}
          <div>
          <p className='mt-3 text-dateGray'>{Moment(props.plan.createdAt).format('MMM/DD/YY')}</p>
          </div>
      </div>
      <div>
      {
        props.plan.amount ? 
        <p className='text-amountGreen'>UGX{numberWithCommas(props.plan.amount)}</p>
        :null
      }
        
       <Button 
       href={'/editplan/'+props.plan._id}
       title='Edit'
       moreStyle='block mt-3'
       />
       </div>
      </div>
</div>
</Link>
		)
}

export default Plan