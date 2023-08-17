import React from 'react'
import { Button } from 'react-bootstrap'

const Login = () => {
  return (
    <div style={{background:"var(--background)"}}>
    <div style={{ width:"100%"  ,background:"var(--background)",padding:"5%",paddingBottom:"8%"}}> 
    <p style={{color:"white",textAlign:"center",fontSize:"0.8rem"}}>STORAGE OPTIONS
</p>
 <h1 style={{color:"var(--background2)",textAlign:"center",fontWeight:"200",fontFamily:"Fright"}}>Secure Storage Options for Your Rare Whiskey NFTs
</h1>
 <p style={{color:"white",textAlign:"center" ,marginTop:"2%",marginBottom:"5%"}}>Choose from a range of storage options, tailored to meet the specific needs of your NFT-backed whiskey collection.

</p>
 

        
    </div>
    <div style={{background:"var(--background3)" ,height:"90vh",display:"flex",alignItems:"center"}}>
    <div style={{width:"50%"}}>
        <div style={{marginLeft:"5%",padding:"5%"}}>
        <h1 style={{color:"var(--background2)",fontWeight:"380",fontFamily:"Fright"}}>Introduction
    </h1>
    <p style={{color:"white"}}>Safeguard your valuable NFT-backed whiskey bottles with our
secure storage facilities. Our state-of-the-art storage options
ensure the preservation and protection of your investment.
Explore our available plans and select the one that best suits
your needs.</p>
<Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}
              >
                DISCOVER OPTIONS
              </Button>{" "}
         </div>
  
    </div>
    <div style={{marginLeft:"5%"}}>
    <img width={500} src='/images/bottle.png' />
    </div>
      </div>

      <div style={{ width:"100%"  ,background:"var(--background)",padding:"8%",paddingBottom:"8%"}}> 
    <p style={{color:"var(--background2)",fontSize:"0.8rem"}}>AVAILABLE OPTIONS
</p>
 <h1 style={{color:"var(--background2)",fontWeight:"200",fontFamily:"Fright",fontSize:"2rem"}}>Choose from a range of storage options
</h1>
 <p style={{color:"white" ,marginTop:"2%",marginBottom:"5%"}}>Choose from a range of storage options, tailored to meet the specific needs of your NFT-backed whiskey collection.

</p>
 <div style={{display:"grid",gridTemplateColumns:"30% 30% 30%",columnGap:"5%"}}>
 <div style={{borderColor:"var(--borderColor)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"0.8rem"}}>BASIC STORAGE</h3>
        <h1 style={{fontSize:"1.3rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$10/Month/Bottle</h1>
        <p style={{color:"white"}}>Features:</p>
        <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>Climate-controlled environment</li>
            <li>24/7 security monitoring</li>
            <li>Monthly storage reports</li>
            <li>Access to online storage dashboard</li>
            <li>Up to 5 bottles stored </li>
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
              >
                SELECT
              </Button>{" "}
    </div>
    <div style={{borderColor:"var(--borderColor)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"0.8rem"}}>PREMIUM STORAGE</h3>
        <h1 style={{fontSize:"1.3rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$20/Month/Bottle</h1>
        <p style={{color:"white"}}>Features:</p>
        <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>All Basic Storage features</li>
            <li>Insurance coverage included</li>
            <li>Up to 15 bottles stored </li>
            <li>Quarterly physical inspections</li>
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
              >
                SELECT
              </Button>{" "}
    </div>
    <div style={{borderColor:"var(--borderColor)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"0.8rem"}}>PLATINUM STORAGE</h3>
        <h1 style={{fontSize:"1.3rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$30/Month/Bottle</h1>
        <p style={{color:"white"}}>Features:</p>
        <ul style={{color:"white",fontSize:"0.8rem"}}>
            <li>All Premium Storage features</li>
            <li>Customizable storage conditions</li>
            <li>Up to 15 bottles stored</li>
            <li>Biannual in-person viewing access</li>
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
              >
                SELECT
              </Button>{" "}
    </div>
 </div>

        
    </div>

    {/* How it works */}
    <div style={{ width:"100%"  ,background:"var(--background3)",padding:"5%",paddingBottom:"8%"}}> 
  
 <h1 style={{color:"var(--background2)",fontWeight:"200",fontFamily:"Fright",fontSize:"2rem",marginLeft:"1%"}}>How It Works

</h1>
 
 <div style={{display:"grid",gridTemplateColumns:"25% 25% 25% 25%",columnGap:"2%",paddingRight:"5%"}}>
 <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
 <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"24%",textAlign:"center" ,padding:"2%"}}>STEP 1</h3>
        <h1 style={{fontSize:"0.9rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Choose a storage plan</h1>
 <p style={{color:"white"}}>Select the storage option that best fits your needs.</p>
       
    </div>
    <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
    <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"24%",textAlign:"center" ,padding:"2%"}}>STEP 2</h3>
        <h1 style={{fontSize:"0.9rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Initiate the process</h1>
 <p style={{color:"white"}}>Follow the guided steps to securely store your NFT-backed whiskey bottles.</p>
       
    </div> <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
    <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"26%",textAlign:"center" ,padding:"2%"}}>STEP 3</h3>
        <h1 style={{fontSize:"0.9rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Ship your bottles</h1>
 <p style={{color:"white"}}>Use the provided shipping label and packaging instructions to ensure the safe arrival of your bottles at our storage facility.</p>
       
    </div> <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
        <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"26%",textAlign:"center" ,padding:"2%"}}>STEP 4</h3>
        <h1 style={{fontSize:"0.9rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Monitor your collection</h1>
 <p style={{color:"white"}}>Access your online storage dashboard to view the status of your stored whiskey bottles and receive regular updates on their condition.</p>
       
    </div>
  
   
 </div>

        
    </div>
    </div>
  )
}

export default Login