import actions from './actions'

const initState = {
  user: null,
  token: null,
  loading: false,
  isAuthenticated: false,
  paymentDetails:{
    amt: 0,
    type: null
  }
}
  
  export const userReducer = (state =initState, action) => {
    switch (action.type) {
      case actions.LOGIN:
        return {
          ...state,
          user: action.user.user
        }
        case actions.STORE_TOKEN: {
          return { ...state, token: action.token.token, isAuthenticated: true };
        }
        case actions.UPDATE_USER: {
          return { ...state, 
            user: {
              ...state.user,
              name: action.data.user.name,
              url: action.data.user.url,
              bio: action.data.user.bio,
              imgpath: action.data.user.imgpath,
              coverimg: action.data.user.coverimg,
            }}
        }
        case actions.PAYMENT_DETAILS: {
          
          return {
            ...state,
            paymentDetails: {
              ...state.paymentDetails,
              totalAmt: action.data.amt,
              type: action.data.type
            }
          };
        }

      default:
        return state;
    }
  };
  