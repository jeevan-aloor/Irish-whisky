import axios from "axios";
import { API_URL, DAILY_BUDGET_PRICE, DAILY_BUDGET_PRODUCT_ID } from "../constants/userConstants";

export const makeDailyBudgetPayment = async (user, navigate, setClientSecret, amount, setSubscriptionId) => {
    const SubscriptionData = {
        customer: user.stripeCustomerId,
        items: [
          {
            price_data:{
              currency: "USD",
              unit_amount: Math.round(Number(amount) * 100),
              product: DAILY_BUDGET_PRODUCT_ID, // from env file
              recurring: {
                interval: "month",
              },
            },
            quantity:1,
          }
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      };
      SubscriptionData['userId'] = user._id
      const {data} = await axios.post(`${API_URL}/initiate-payment`,SubscriptionData)
      if (data.status === "Success") {
        setClientSecret(data.clientSecret)
        setSubscriptionId(data.subscriptionId)
        } else {
        console.log("Error")
      }
}