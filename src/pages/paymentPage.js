import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { makeDailyBudgetPayment } from '../utils/helper';
import { STRIPE_PUBLIC_KEY } from '../constants/userConstants';

const PaymentPage = () => {
    const user = useSelector(state => state.user.user)
    const storePaymentDetails = useSelector(state => state.user.paymentDetails)
    const navigate = useNavigate()

    const [stripePromise, setStripePromise] = useState(null);

    const [clientSecret, setClientSecret] = useState("");
    const [subscriptionId, setSubscriptionId] = useState(null)
    const [email, setEmail] = useState('')


    const getStripeData = async () => {
      setStripePromise(await loadStripe(STRIPE_PUBLIC_KEY))
    }
    
    const fetchData = async () => {
      await makeDailyBudgetPayment(user, navigate, setClientSecret, storePaymentDetails.totalAmt , setSubscriptionId)
    }
    function ValidateEmail(mail) 
    {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
      {
        return (true)
      }
        alert("You have entered an invalid email address!")
      return (false)
    }

    useEffect(() => {
      getStripeData()
    },[clientSecret])

    useEffect(() => {
      fetchData()
  } ,[] )
 
 const appearance = {
  theme: 'night',
  variables: {
    fontFamily: 'Sohne, system-ui, sans-serif',
    fontWeightNormal: '500',
    borderRadius: '8px',
    colorBackground: '#0A2540',
    colorPrimary: '#EFC078',
    colorPrimaryText: '#1A1B25',
    colorText: 'white',
    colorTextSecondary: 'white',
    colorTextPlaceholder: '#727F96',
    colorIconTab: 'white',
    colorLogo: 'dark'
  },
  rules: {
    '.Input, .Block': {
      backgroundColor: 'transparent',
      border: '1.5px solid var(--colorPrimary)'
    }
  }
};

  return (
    <>
                <div className="payment-section">

    <div className="inner_payment">

      <div className="row_parent">

        <div className="container">

          <div className="col_left">
            
            <p>{storePaymentDetails?.type} SUBSCRIPTION</p>

            <h2>{storePaymentDetails?.totalAmt}/Month</h2>

            <p>Benefits</p>
            <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>Access to premium content, and newsletter</li>
            <li>Members have access to NFT collection </li>
            <li>Up to 5  bottles stored  free</li>
        </ul>

            
            {/* <div className="amount">
            
            <div className="flex1 amt-line">
              <>
                <span> 
                  <img className='socail-img' src="item.icon" alt="item.name" />
                {storePaymentDetails.type}</span>
                <span>30 days <b>${storePaymentDetails.amt}/month</b></span> :<span>Per month <b>charges</b> </span>
              </>
            </div>
            
            <div className="flex1 amt-line"> 
            <>
            <span>Renewel Amount</span>
            
            <span>$20/month</span>
            </>
          </div>
            <div className="flex1 amt-line"> 
            <>
            <span>Renewel Date</span>
            
            <span>{ moment(Date.now()).add('1', 'month').format('DD/MM/YYYY') }</span>
            </>
          </div>
            <div className="flex1 amt-line"> <span>Subtotal</span>
            <span>${payCredentails.totalAmt}</span>
            </div>
                     
            </div> */}


          </div>

          <div className="col_right card-details">
            
            <h3>Email*</h3>
            
            <form>
            <div className="form-input">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' style={{outline:'none'}} />
            </div>
            
              <>
                {stripePromise && clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret: clientSecret, appearance }}>
                  <CheckoutForm paymentDetails={storePaymentDetails} subscriptionId={subscriptionId} email={email} />
                </Elements>
                ): ""}
              </>
            
            </form>
            
          </div>

        </div>
</div>
     
      </div>
  </div>
    </>
  )
}

export default PaymentPage