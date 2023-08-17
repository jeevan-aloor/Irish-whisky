const actions = {
    LOGIN: "LOGIN",
    STORE_TOKEN: "STORE_TOKEN",
    UPDATE_USER: "UPDATE_USER",
    PAYMENT_DETAILS: "PAYMENT_DETAILS",

    login: (user) => {
        return {
          type: actions.LOGIN,
          user,
        };
      },
    storeToken: (token) => {
    return {
        type: actions.STORE_TOKEN,
        token,
    };
    },
    updateUser: (data) => {
      return {
        type: actions.UPDATE_USER,
        data
      }
    },
    paymentDetails: (data) => {
      return {
        type: actions.PAYMENT_DETAILS,
        data
      }
    },
}

export default actions