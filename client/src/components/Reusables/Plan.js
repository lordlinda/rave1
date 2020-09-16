import React from 'react'
import Moment from 'moment'
import {numberWithCommas} from '../../helpers/middleware.js'
import { extendMoment } from 'moment-range'

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
		<div className='md:mt-5 md:w-full'>
  {/*we want the interval to be  beside the other text*/}
    <div className='flex justify-between'>
    <div>
     <p className='md:text-xl md:font-semibold'>{props.plan.description ? props.plan.description :'Checking account'}</p>
     {/*we display the installment amount and the due date next to each other*/}
          <div className='flex text-gray-700 md:text-md flex-wrap'>
          <p>UGX{numberWithCommas(props.plan.installment)}</p>
          <p className='ml-1'>{getDate(props.plan.planId,props.plan.createdAt)}</p>
          </div>
      </div>
    {/*we want the interval to have in a background that is round h-full ensures that it is only arond the interval text*/}
      <div className='bg-purple-500 text-white rounded-lg h-full px-2'>{duration(props.plan.planId)}</div>
      </div>
</div>
		)
}

export default Plan