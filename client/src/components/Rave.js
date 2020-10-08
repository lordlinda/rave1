import React from 'react';
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import Input from './Reusables/Input.js'
import { connect } from 'react-redux'
import * as actions from '../redux/actions/index.js'
import Select from './Reusables/select/Select.js'
import BackArrow from './Reusables/BackArrow.js'
import { currencyOptionsArray } from './Reusables/select/Options.js'

class Rave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txref: (new Date()).toString(),
      customer_email: "user@example.com",
      customer_phone: "234099940409",
      amount: '',
      currency: 'UGX',
      PBFPubKey: 'FLWPUBK-79088d65bc6390fac8bb696a84e646cc-X',
      production: false,
      onSuccess: (response) => {
        console.log(response)
        const id = this.props.match.params.id
        const variables = {
          response: response,
          id: id
        }
        this.props.makePayment(variables)

      },
      onClose: () => { console.log("closed") }
    }
    this.handleChange = this.handleChange.bind(this)
    this.getCurrency = this.getCurrency.bind(this)
  }
  handleChange = (e) => {
    this.setState({ amount: e.target.value })

  }
  getCurrency(e) {
    this.setState({ currency: e.target.value })
  }
  componentDidMount() {
    this.props.loadUser()
    this.setState({
      customer_email: localStorage.email,

    })
  }

  render() {

    return (
      <div className='px-5'>
        <div className='flex items-baseline justify-center'>
          <BackArrow href='/' moreStyle='pt-2' />
          <p className='mt-5 text-center ml-5 text-titleLink'>Add money to your account</p>
        </div>
        <div className='border border-titleGray mx-3 px-6 py-4 text-center mt-8 rounded-lg'>
          <Input
            placeholder='0.00'
            value={this.state.amount}
            onChange={this.handleChange}
            type='number'
            moreStyle='text-6xl w-full text-center text-titleGray placeholder-titleGray'
          />


          <Select
            value={this.state.currency}
            onChange={this.getCurrency}
            options={currencyOptionsArray}
            moreStyle='bg-white'
          />
        </div>

        <RaveProvider {...this.state}>
          <RavePaymentButton type='submit'
            className='bg-titleDark text-white mt-12 py-1 font-medium px-5 rounded-md w-full'
          >Make payment</RavePaymentButton>
        </RaveProvider>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.data.email
  }
}
export default connect(mapStateToProps, actions)(Rave)