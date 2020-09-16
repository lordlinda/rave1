import React from 'react'
import {connect} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import {Link} from 'react-router-dom'

import Total from './Total.js'
import Rave from './Rave.js'
import Avatar from './Reusables/Avatar.js'
import Plan from './Reusables/Plan.js'
import Button from './Reusables/Button.js'
import Transaction from './Reusables/Transaction.js'
import * as actions from '../redux/actions/index.js'
import Navbar from './Navbar/Navbar.js'



const Dashboard=(props)=>{
	return(
		<div className='md:mt-3 px-2 sma:px-0'>
		   <div className='sma:px-5 md:px-4'>
	      	{/*this is displays the title of the page*/}
          <div className='md:flex md:justify-between'>
		      <p className='sd:text-3xl md:py-4 font-bold sd:ml-4 text-xl ml-3 m-4 '>
          <Navbar />
          Dashboard</p>
          <Avatar />
        </div>
		     {/*for medium and large screens total and rave are side by side*/}
		          <div className='sma:flex sd:justify-between'>
               {/*we display the total*/}
               <div 
                style={{backgroundImage:'linear-gradient(95.8deg, #AE64D1 -3.34%, #46C1BA 97.61%)'}}
               className='sma:w-7/12 rounded-lg md:px-4 md:py-2 shadow-natural px-4 m-2 shadow-sm py-2'>
               <Total
               total={props.total} />
               </div>
             {/*we display the payment section
             the left margin gives it space from the total div*/}
             <div className='bg-white sma:w-5/12 rounded-lg md:px-4 md:ml-3 md:py-2 shadow-light px-4 m-2 shadow-sm py-2'>
             <p className='text-sm uppercase text-graydark'>Start Saving</p>
              <Rave/>
              </div>
              </div>


          {/**
          *********
          the second section of the dahboard
          ********
      *we give it some distance from the first section
      ***/}
              <div className='sd:flex sd:justify-between mt-5 px-2'>
               <div className='bg-white sd:w-7/12 rounded-lg px-2 py-2 shadow-light'>
              {/*we give the title some distance from the top of the conatiner*/}
               <p className='mt-2 px-5 text-graydark'>Recent Transactions</p>
                 <div className=''>
                 <table className="w-full mt-3">
          <tbody>
          {
                props.transactions.length > 0  ?
                props.transactions.map(transaction=>{
                  return <Transaction transaction={transaction} key={transaction._id}/>
                })
                :<tr>
                 <td> No transactions yet yet</td>
                </tr>

               }
          </tbody>
        </table>
        <Button 
        href='/transactions'
        title='All transactions'
        moreStyle='py-1 px-2 rounded-lg block ml-4 bg-purple-500 text-white text-center'
        />
            </div>
              </div>
               <div className='bg-white sd:w-5/12 rounded-lg px-4 py-2 sd:ml-3 shadow-light mt-2 sd:mt-0'>
           {/*we give the title some distance from the top of the conatiner*/}
         {/*we want the add icon to be to the right of the title*/}
                <div className='flex justify-between items-baseline'>
               <p className='md:mt-2 text-graydark'>Subscriptions</p>
               <Link to='/subscriptions' className='text-purple-500'><AddIcon /></Link>
               </div>
           {/*we give the subscriptions some pixels from the title*/}
               <div className='mt-2'>
               {
                props.subscriptions.length > 0  ?
                props.subscriptions.map(subscription=>{
                  return <Plan plan={subscription} key={subscription._id}/>
                })
                :<tr>
                 <td> You have no subscriptions yet</td>
                </tr>

               }
                 </div>
               </div>
            
            
              </div>
		    </div>
		</div>
		)
}



const mapStateToProps=(state)=>{
	return {
         transactions:state.data.transactions,
         plans:state.data.plans
	}
}

export default connect(mapStateToProps,actions)(Dashboard)