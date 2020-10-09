import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions/index.js'
import Select from '../Reusables/select/Select.js'
import { currencyOptionsArray } from '../Reusables/select/Options.js'
import { calculateTotal } from '../../helpers/middleware.js'

const Total = (props) => {
  const [total, setTotal] = useState('0')
  const [currency, setCurrency] = useState('UGX')

  useEffect(() => {
    props.getTransactions()
    setTotal(calculateTotal(props.transactions))
  }, [props.transactions.length])

  const handleChange = (e) => {
    setCurrency(e.target.value)
  }
  return (
    <div className='bg-customPurple mt-5 rounded-md'>
      {/*the total container has a custom background color  and margin from the greeting with a border-radius*/}
      <div className='px-6 pt-4 pb-12 font-bold'>
        {/*the div above gives the text some distance from the borders*/}
        <p className='text-3xl text-white'>{total}</p>

        {/*we want to ensure the select group is directly underneath so we add a negative margin to the select group*/}

        <div className='flex items-baseline -mt-4'>
          <p className='text-white'> Total Balance in</p>
          <Select
            value={currency}
            onChange={handleChange}
            moreStyle='bg-customPurple text-white'
            options={currencyOptionsArray}
          />
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    transactions: state.data.transactions
  }
}

export default connect(mapStateToProps, actions)(Total)