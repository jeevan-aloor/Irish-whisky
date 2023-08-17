import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../constants/userConstants";

export default function CheckoutForm({paymentDetails, subscriptionId, email}) {
  const stripe = useStripe();
  let elements = useElements();
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements ) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);

    const {error, paymentIntent} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8080/dashboard"
      },
      redirect: "if_required"
    })
  
    if (error) {
    } else if(paymentIntent && paymentIntent.status === "succeeded") {
      let values = {
        paymentIntent,
        subscriptionId,
        email,
        userId: user._id
      }
      const { data } = await axios.post(`${API_URL}/save-payment-data`,values)
      
      if(data.status === "Success"){
        navigate("/dashboard")
      }
    }
    setIsProcessing(false);
  };

  return (
    <>
      <form id="payment-form">
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} onClick={(e) => handleSubmit(e)} id="submit" style={{
                  color: "white",
                  backgroundColor: "var(--background1)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}>
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
    </form>
    </>
  );
}
