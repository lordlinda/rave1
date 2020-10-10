import axios from 'axios'
export const setCurrency = (currency) => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENCY',
            payload: currency
        })

    }
}

export const setStartDate = (startDate) => {
    console.log(startDate)
    return dispatch => {
        dispatch({
            type: 'SET_START_DATE',
            payload: startDate
        })

    }
}

export const setEndDate = (endDate) => {
    console.log(endDate)
    return dispatch => {
        dispatch({
            type: 'SET_END_DATE',
            payload: endDate
        })

    }
}

export const setpaymentMethod = (paymentMethod) => {
    console.log(paymentMethod)
    return dispatch => {
        dispatch({
            type: 'SET_PAYMENT_METHOD',
            payload: paymentMethod
        })

    }
}

export const searchTransactions = (filters) => async (dispatch) => {
    console.log(filters)
    await axios
        .post('/transactions', filters)
        .then(res => {
            //console.log(res.data)
            dispatch({
                type: 'SEARCH_TRANSACTIONS',
                payload: res.data.transactions
            })

        })
}