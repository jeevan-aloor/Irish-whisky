import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authActions from "../redux/auth/actions";

const { paymentDetails } = authActions

const Subscription = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubscribe = async (amt,type) => {
    dispatch(paymentDetails({amt,type}))
    navigate("/payment")
  }

  return (
    <div style={{ background: "var(--background)" }}>
      <div
        style={{
          width: "100%",
          background: "var(--background)",
          padding: "5%",
          paddingBottom: "8%",
        }}
      >
        <p style={{ color: "#F4F5F6", textAlign: "center", fontSize: "0.8rem" }}>
        LOYALTY AND SUBSCRIPTION
        </p>
        <h1
          style={{
            color: "var(--background2)",
            textAlign: "center",
            fontWeight: "200",
            fontFamily: "Fright",
          }}
        >
          Exclusive Benefits for Loyal Whiskey Enthusiasts
        </h1>
        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "2%",
            marginBottom: "5%",
          }}
        >
          Unlock premium features and enjoy special perks with our loyalty and subscription programs.
        </p>
      </div>
      <div
        style={{
          background: "var(--background3)",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          // backgroundImage:"https://s3-alpha-sig.figma.com/img/3e33/a686/060bef7b86e1a2062af20d7a70a7f893?Expires=1690761600&Signature=fJhQqSF38DC-R0BE6GHkJnMGWoBJE~kvzzHDtDTLtMIlFe8LlMS1PiHCOr5ERMZX-HhJbdQklx8H6UJqSuUCdcY-GF-KwwqB2gGy7ss0f7exwYDrmpqKVsAom3S2F2T1zTJvlFy2CjXLvgDqLc7tIISoWRWN9QauojxnEhpLlFpCizd9425Af1XDwpOiqNgowbxTnKnM0qzNYl1n97F9JxS8bQanwTh3rAZPmORzXy7JrvgQiEj68JQZWo0B6LaQsxtdukNDGEkpAQ0iD7pXl7INDcCeKQ259WDnajru33vbj7lOl--ywo9~EnQ5RaULkh1JsGiIArDwUM4wK~hSBw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          // backgroundRepeat:"no-repeat",
          // backgroundPosition:"right centre"
          
          
        }}
      >
        <div style={{ width: "50%"}}>
          <div style={{ marginLeft: "5%", padding: "5%" }}>
            <h1
              style={{
                color: "var(--background2)",
                fontWeight: "380",
                fontFamily: "Fright",
              }}
            >
              Introduction
            </h1>
            <p style={{ color: "white",width:"500px" }}>
               At [Your Company Name], we value our users and strive to provide an exceptional experiance on our platform.Our loyality and subscription programs offers exclusive benefits such as reduces fees ,priority access to rare bottles ,and personalised whisky recomandation. Discover the program that suits your needs and elevate your whisky NFT journey.
            </p>
            <Button
              style={{
                color: "white",
                backgroundColor: "var(--background3)",
                height: "2.5rem",
                marginTop: "1rem",
                marginRight: "1rem",
                borderColor: "var(--background2)",
                borderRadius: "0%",
                paddingLeft: "5%",
                paddingRight: "5%",
                borderWidth: "0.1rem",
              }}
            >
              LEARN MORE 
            </Button>
          </div>
        </div>
        <div style={{ marginLeft: "5%" }}>
          <img width={480} src="/images/subscription.png" />
        </div>
      </div>

      {/* How it works */}
      <div
        style={{
          width: "100%",
          background: "var(--background)",
          padding: "5%",
          paddingBottom: "8%",
          
        }}
      >
        <p     style={{
                        marginLeft: "1%",
                        fontSize: "0.8rem",
                        color: "var(--background2)",

          }}>LOYALTY AND SUBSCRIPTION</p>
        <h1
          style={{
            color: "var(--background2)",
            fontWeight: "200",
            fontFamily: "Fright",
            fontSize: "2rem",
            marginLeft: "1%",
          }}
        >
         Loyalty Program
        </h1>
        <p     style={{
                        marginLeft: "1%",
                        fontSize: "0.8rem",
                        color: "white",
                        paddingRight:"10%"

          }}>Unlock exclusive perks and rewards with our Loyalty Program, designed to enrich your whiskey NFT experience through referral bonuses, whiskey points, and priority access to rare bottles and special events.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "32% 32% 32% ",
            columnGap: "1%",
            paddingRight: "5%",
          }}
        >
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
       
            <h1
              style={{
                fontSize: "1.2rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
Referral Program            </h1>
            <ul style={{ color: "white" }}>
            <li>Invite friends to join IWC  and earn rewards when they sign up and make their first purchase.</li>
            <li>Get 2% royalty fees on each referral sale for life.</li>
            </ul>
          </div>
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
       
            <h1
              style={{
                fontSize: "1.2rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
Whiskey Points        </h1>
            <ul style={{ color: "white" }}>
            <li>Earn points with each purchase on our platform, which can be redeemed for discounts on future transactions.
</li>
            </ul>
          </div>
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
       
            <h1
              style={{
                fontSize: "1.2rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
Exclusive Access           </h1>
            <ul style={{ color: "white" }}>
            <li>Gain early access to rare whiskey NFT releases and special events on our platform.</li>
            <li>Demo Data: Loyal members receive a 24-hour head start on limited edition whiskey NFT drops.</li>
            </ul>
          </div>
        </div>
   
      </div>
      <div style={{ display: "grid", background: "var(--background3)" }}>
        <div style={{ marginLeft: "5%", marginTop: "5%",width:"1230px" }}>
          {" "}
          <p style={{ color: "#D2A163", fontSize: "0.8rem" }}>AVAILABLE PROGRAMS</p>
          <h1
            style={{
              color: "var(--background2)",
              fontWeight: "380",
              fontFamily: "Fright",
              fontSize:"48px"
            }}
          >
            Subscription Program
          </h1>
          <p
            style={{ color: "#E6E8EC", marginBottom: "2%", paddingRight: "10%" }}
          >
           Elevate your whiskey NFT journey with our Subscription Programs, offering premium benefits such as reduced transaction fees, personalized recommendations, and expert portfolio consultations tailored to your unique preferences and goals.
          </p>
        </div>
        <div style={{display:"grid",width:"1300px",gridTemplateColumns:"30% 30% 30%",columnGap:"1%",paddingLeft:"4%",paddingBottom:"5%"}}>
 <div style={{borderColor:"var(--borderColor)",background:"var(--background)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"16px"}}>SILVER SUBSCRIPTION</h3>
        <h1 style={{fontSize:"30px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$10/Month</h1>
        <p style={{color:"white"}}>Benefits:</p>
        <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>Access to premium content, and newsletter</li>
            <li>Members have access to NFT collection </li>
            <li>Up to 5  bottles stored  free</li>
        </ul>
        
        <Button
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
                  height: "2.5rem",
                  marginTop: "6rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem",
                  width:"100%"
                }}
                onClick={() => handleSubscribe(10,"SILVER")}
              >
                SUBSCRIBE
              </Button>{" "}
    </div>
    <div style={{borderColor:"var(--borderColor)",background:"var(--background)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"16px"}}>GOLD SUBSCRIPTION</h3>
        <h1 style={{fontSize:"30px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$20/Month</h1>
        <p style={{color:"white"}}>Benefits:</p>
        <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>Reduced transaction fees 5% </li>
            <li>Priority access to rare whiskey NFTs,  </li>
            <li>Personalised whiskey recommendations</li>
            <li>Access to premium content, newsletter, and exclusive online events.</li>
            <li>Up to 15  bottles stored  free</li>
            <li>Customer monthly  report </li>
        </ul>
        <Button
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem",
                  width:"100%"
                }}
                onClick={() => handleSubscribe(20, "GOLD")}
              >
                SUBSCRIBE
              </Button>{" "}
    </div>
    <div style={{borderColor:"var(--borderColor)",background:"var(--background)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"16px"}}>PLATINUM SUBSCRIPTION</h3>
        <h1 style={{fontSize:"30px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$40/Month</h1>
        <p style={{color:"white"}}>Benefits:</p>
        <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>All the features of sliver and gold </li>
            <li>Reduced transaction fees  3%  </li>
            <li>Priority access to rare whiskey NFTs</li>
            <li>Annual in-person viewing access</li>
            <li>Up to 30 bottles stored free</li>
            <li>Free shipping  </li>
            <li>Quarterly physical inspections
                     </li>
        </ul>
        <Button
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem",
                  width:"100%"



                }}
                onClick={() => handleSubscribe(40, "PLATINUM")}
              >
                SUBSCRIBE
              </Button>{" "}
    </div>
  </div>
         <h2 style={{width:"1300px",color:"var(--background2)",paddingBottom:"8%",paddingLeft:"12%",paddingTop:"2%",paddingRight:"12%",fontFamily:"fright",textAlign:"center", fontWeight:"700",lineHeight: "61px",fontSize:"48px"}}>
         Join our loyalty or subscription program today and start enjoying the exclusive benefits tailored to your whiskey NFT experience.</h2>

      </div>
    </div>
  );
};

export default Subscription;
