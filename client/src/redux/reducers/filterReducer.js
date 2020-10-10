
const initialState = {
    paymentMethod: '',
    startDate: null,
    endDate: null,
    currency: '',

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.payload
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.payload
            }

        case 'SET_CURRENCY':
            return {
                ...state,
                currency: action.payload
            }
        case 'SET_PAYMENT_METHOD':
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}